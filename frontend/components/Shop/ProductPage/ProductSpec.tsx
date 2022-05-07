import React, { useState, useContext, useReducer, useEffect } from "react";
import {
  Spinner,
  Button,
  Container,
  Text,
  Image,
  Flex,
  Box,
} from "@chakra-ui/react";
import axios from "axios";
import constants from "../../../util/Constants";
import SpecificationTable from "./SpecificationTable";
import { SpecTableContext } from "../../../context/SpecTableContext";
import ImageGallery from "../Product/ImageGallery";
import DragUpload from "../../Custom/DragUpload";
import { ProductInfoContext } from "../../../context/ProductInfoContext";
import { getProductInfo } from "../../../util/ProductInfo";
import CustomContainer from "../../Custom/CustomContainer";
import { CustomField } from "../../Custom/CustomField";
import OptionsTable from "../../Admin/OptionsTable";
import CategorySearch from "../../Widgets/CategorySearch";
import {
  CategoryNode,
  CategoryTree,
  convertToCustomTree,
} from "../../../util/Tree";
import SelectCategory, { getAllCategory } from "../../Admin/SelectCategory";
import SelectUnitMenu from "../../Widgets/SelectUnitMenu";
import { fetchUnits } from "../../../services/UnitService";
import api from "../../../util/AxiosApi";
import GSTSelectorModal from "../../Widgets/GSTSelectorModal";

const productValueReducer = (state: any, action: any) => {
  switch (action.type) {
    case "set-product-name":
      return { ...state, name: action.payload };
    case "set-product-description":
      return { ...state, description: action.payload };
    case "set-product-price":
      return { ...state, price: action.payload };
    case "set-product-category":
      return { ...state, category: action.payload };
    default:
      return state;
  }
};

interface UpdateProductValueFormProps {
  getDropDownStatus?: (status: boolean) => void;
}

const UpdateProductValueForm = ({
  getDropDownStatus,
}: UpdateProductValueFormProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [allUnits, setAllUnits] = useState<any[]>([]);
  const [selectedUnit, setSelectedUnit] = useState<any>();

  const { productInfo } = useContext(ProductInfoContext);
  const [product, setProduct] = productInfo;

  const [productValues, dispatchProductValues] = useReducer(
    productValueReducer,
    {
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category.category_id,
      gst: product.gst?.id,
    }
  );
  const [customTree, setCustomTree] = useState<CategoryTree>();
  const [selectedCategory, setSelectedCategory] = useState<CategoryNode | null>(
    null
  );

  useEffect(() => {
    getAllCategory().then((categories) => {
      const customTree = convertToCustomTree(categories);
      setCustomTree(customTree);
      // finding the category that matches the product category
      customTree.findNodeById(product.category, customTree.root, (category) => {
        setSelectedCategory(category);
      });
    });
  }, []);

  const updateProduct = () => {
    setLoading(true);
    console.log({
      id: product.id,
      ...productValues,
      unit: selectedUnit?.unit_id,
    });
    axios
      .post(
        `${constants.url}/shop/updateproduct/`,
        {
          id: product.id,
          ...productValues,
          unit: selectedUnit?.unit_id,
        },
        {
          withCredentials: true,
        }
      )
      .then(() => {
        getProductInfo(product.id)
          .then((newProduct) => {
            setTimeout(() => setLoading(false), 500);
            setProduct(newProduct);
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  };

  const handleChange = (e: any, type: string) => {
    dispatchProductValues({
      type,
      payload: e.target.value,
    });
  };

  useEffect(() => {
    fetchUnits().then((units) => setAllUnits(units));
  }, []);

  useEffect(() => {
    if (product.unit) {
      setSelectedUnit(product.unit);
    }
  }, [product]);

  const CategorySearchEl = () => {
    if (selectedCategory && customTree) {
      return (
        <CategorySearch
          flex="1"
          categoryTree={customTree}
          value={selectedCategory.val.name}
          getDropDownStatus={(status) => {
            if (getDropDownStatus) getDropDownStatus(status);
          }}
        />
      );
    } else if (customTree) {
      return (
        <CategorySearch
          flex="1"
          categoryTree={customTree}
          getDropDownStatus={(status) => {
            if (getDropDownStatus) getDropDownStatus(status);
          }}
        />
      );
    }
  };

  return (
    <Flex flexDirection="column" gridGap={5} w="100%" mb="5%">
      <CustomField
        w="100%"
        label="Product Name"
        value={productValues.name}
        onChange={(e: any) => handleChange(e, "set-product-name")}
      />
      <CustomField
        w="100%"
        h="10em"
        padding="2%"
        as="textarea"
        label="Product Description"
        value={productValues.description}
        onChange={(e: any) => handleChange(e, "set-product-description")}
      />
      <Flex flexDirection="row" gridGap={3} w="100%">
        <CustomField
          w="100%"
          label="Product Price"
          value={productValues.price}
          type="number"
          onChange={(e: any) => handleChange(e, "set-product-price")}
        />
        <SelectUnitMenu
          mt="1.8rem"
          allUnits={allUnits}
          selectedUnit={selectedUnit}
          setSelectedUnit={setSelectedUnit}
        />
      </Flex>
      {customTree ? (
        <Flex flexDirection="row" gridGap={2}>
          <SelectCategory
            w="100%"
            height="4.9vh"
            mt="2%"
            text={product.category.category_name || "Select Category"}
            selectCb={({ selectedCategory }) => {
              if (selectedCategory) {
                setSelectedCategory(selectedCategory);
                dispatchProductValues({
                  type: "set-product-category",
                  payload: selectedCategory.val.id,
                });
              }
            }}
          />
        </Flex>
      ) : (
        <></>
      )}
      <GSTSelectorModal selectCb={(data: any) => {}} />

      <Button
        size="lg"
        mt="3%"
        mb="5%"
        variant="secondarySolid"
        onClick={updateProduct}
        position="unset"
      >
        {loading ? <Spinner size="sm" /> : "Save"}
      </Button>
    </Flex>
  );
};

const ProductSpec: React.FC = () => {
  const [specTableHeading, setSpecTableHeading] = useState<any[]>([]);
  const [tableExists, setTableExists] = useState<boolean>(
    specTableHeading.length !== 0
  );
  const [openAddRowModal, setOpenAddRowModal] = useState<boolean>(false);
  const [modifyAddRowModal, setModifyAddRowModal] = useState<boolean>(false);
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [clearUploadedFiles, setClearUploadedFiles] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [dropDownStatus, setDropDownStatus] = useState<boolean>(false);

  const { productInfo } = useContext(ProductInfoContext);
  const [product, setProduct] = productInfo;

  const createTableHeading = () => {
    if (specTableHeading.length === 0)
      setSpecTableHeading([
        ...specTableHeading,
        <Text key={specTableHeading.length + 1} fontWeight="bold">
          Specification
        </Text>,
        <Text key={specTableHeading.length + 2} fontWeight="bold">
          Details
        </Text>,
      ]);
  };

  const createTable = async () => {
    await api.post(
      "/shop/createtable/",
      {
        product_id: product.id,
      },
      {
        withCredentials: true,
      }
    );
    setTableExists(true);
  };

  const CreateSpecificationTableBtn: React.FC = () => {
    if (!tableExists)
      return (
        !tableExists && (
          <Button
            size="lg"
            mb="2em"
            width="100%"
            variant="primarySolid"
            onClick={() => {
              createTableHeading();
              createTable();
            }}
          >
            Create Specification Table
          </Button>
        )
      );
    else return <></>;
  };

  const uploadAllImages = () => {
    let formData = new FormData();
    formData.append("productId", product.id.toString());
    uploadedImages.forEach((img, indx) => {
      formData.append(`file[${indx}]`, img);
    });
    axios
      .post(`${constants.url}/shop/addproductimages/`, formData, {
        withCredentials: true,
      })
      .then(() => {
        getProductInfo(product.id)
          .then((newProduct) => {
            setProduct(newProduct);
          })
          .catch((err) => console.error(err));
        setClearUploadedFiles(true);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  if (product)
    return (
      <SpecTableContext.Provider
        value={{
          headings: [specTableHeading, setSpecTableHeading],
          tableExist: [tableExists, setTableExists],
          openRowModal: [openAddRowModal, setOpenAddRowModal],
          modifyRowModal: [modifyAddRowModal, setModifyAddRowModal],
        }}
      >
        <Flex
          marginLeft="12em"
          position="absolute"
          flexDirection="row"
          gridGap="100"
          pb="5%"
        >
          <Container margin="0" marginTop="2em" marginBottom="2em">
            {product && (
              <CustomContainer
                borderRadius="2xl"
                width="38em"
                height="80%"
                maxHeight="38em"
                padding="5%"
                position="relative"
                interactive
                transition="all ease-in-out 0.5s"
              >
                {product.image.map((curImg, indx) => (
                  <Image
                    position="absolute"
                    key={indx}
                    objectFit="contain"
                    src={`${constants.url?.substring(
                      0,
                      constants?.url.lastIndexOf("/")
                    )}${curImg.image}
                    `}
                    opacity={
                      curImg.image === product.image[selectedImage].image
                        ? 1
                        : 0
                    }
                    width="90%"
                    height="30em"
                    transition="all ease-in-out 0.5s"
                  />
                ))}
              </CustomContainer>
            )}
            <ImageGallery
              marginTop="2em"
              width="100%"
              selectCb={(indx) => {
                setSelectedImage(indx);
              }}
              allowEdit
            />
            <DragUpload
              marginTop="10%"
              marginLeft="-3%"
              width="106%"
              height="14vh"
              clearUpload={[clearUploadedFiles, setClearUploadedFiles]}
              onFileUpload={(files) => {
                console.log({ files });
                if (files.length !== 0) {
                  setUploadedImages(files);
                }
              }}
            />
            <Button
              variant="primarySolid"
              margin="2em 0"
              size="lg"
              width="100%"
              onClick={uploadAllImages}
            >
              Upload Additional Images
            </Button>
            <CreateSpecificationTableBtn />
          </Container>
          <Container marginTop="2em" width="40em">
            <UpdateProductValueForm
              getDropDownStatus={(status) => {
                setDropDownStatus(status);
              }}
            />
            <Box position="relative" zIndex={dropDownStatus ? "-1" : "11"}>
              <SpecificationTable />
              <OptionsTable mt="5%" borderRadius="lg" />
            </Box>
          </Container>
        </Flex>
      </SpecTableContext.Provider>
    );
  else return <></>;
};

export default ProductSpec;
