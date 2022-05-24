import { Text, Flex, FlexProps, Button } from "@chakra-ui/react";
import { useState, useContext, useReducer, useEffect } from "react";
import { FaSave } from "react-icons/fa";
import { GSTSelectorContext } from "../../../context/GSTSelectorContext";
import { ProductInfoContext } from "../../../context/ProductInfoContext";
import { useWindowDimensions } from "../../../hooks/useWindowDimensions";
import {
  updateProduct,
  getProductInfo,
} from "../../../services/ProductService";
import { fetchUnits } from "../../../services/UnitService";
import { scrollBarStyle } from "../../../util/ScrollBarStyle";
import {
  CategoryTree,
  CategoryNode,
  convertToCustomTree,
} from "../../../util/Tree";
import SelectCategory, { getAllCategory } from "../../Admin/SelectCategory";
import { CustomField } from "../../Custom/CustomField";
import EnterPrice from "../../Widgets/EnterPrice";
import GSTSelectorModal from "../../Widgets/GSTSelectorModal";
import SelectUnitMenu from "../../Widgets/SelectUnitMenu";

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
    case "set-product-gst":
      return { ...state, gst: action.payload };
    default:
      return state;
  }
};

const UpdateProductValueForm = ({ ...props }: FlexProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [allUnits, setAllUnits] = useState<any[]>([]);
  const [selectedUnit, setSelectedUnit] = useState<any>();

  const { productInfo } = useContext(ProductInfoContext);
  const [product, setProduct] = productInfo;

  const [gstSelectedRows, setGstSelectedRows] = useState<any>(product.gst);
  const [productValues, dispatchProductValues] = useReducer(
    productValueReducer,
    {
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category.category_id,
      gst: gstSelectedRows,
    }
  );
  const [customTree, setCustomTree] = useState<CategoryTree>();
  const [selectedCategory, setSelectedCategory] = useState<CategoryNode | null>(
    null
  );
  const [allPriceData, setAllPriceData] = useState<any[]>(product.price);
  const [deletedProductPriceIndx, setDeleteProductPriceIndx] = useState<any[]>(
    []
  );
  const [width] = useWindowDimensions();

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

  useEffect(() => {
    dispatchProductValues({
      type: "set-product-gst",
      payload: gstSelectedRows,
    });
  }, [gstSelectedRows]);

  const handleUpdateProduct = () => {
    setLoading(true);
    updateProduct({
      id: product.id,
      unit: selectedUnit?.unit_id,
      ...productValues,
      price: allPriceData.filter((price) => price.new),
      deletedProductPriceIndx,
    })
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
    console.log({ product });
    if (product.unit) {
      setSelectedUnit(product.unit);
    }
  }, [product]);

  return (
    <Flex
      flexDirection="column"
      gridGap={5}
      mb="5%"
      justifyContent="left"
      alignContent="left"
      {...props}
    >
      <CustomField
        w="100%"
        label="Product Name"
        value={productValues.name}
        onChange={(e: any) => handleChange(e, "set-product-name")}
      />
      <CustomField
        w="100%"
        minH="10em"
        h="3xs"
        padding="2%"
        as="textarea"
        label="Product Description"
        value={productValues.description}
        onChange={(e: any) => handleChange(e, "set-product-description")}
        sx={scrollBarStyle()}
      />
      <Text color="gray.500" fontFamily="Sora" fontSize="0.9rem">
        Product Price :
      </Text>
      <EnterPrice
        {...{ allPriceData, setAllPriceData }}
        deleteCb={(id: any) =>
          setDeleteProductPriceIndx([...deletedProductPriceIndx, id])
        }
      />
      {customTree ? (
        <Flex
          flexDirection={width < 490 ? "column" : "row"}
          gridGap={width < 490 ? "2" : "0"}
          mt="2.1rem"
          flexWrap="wrap"
        >
          <SelectCategory
            {...(width > 490 ? { ...{ flex: "0.7" } } : {})}
            borderRightRadius={width < 490 ? "md" : "none"}
            borderLeftRadius="md"
            size="lg"
            text={product.category.category_name || "Select Category"}
            variant="primaryLightSolid"
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
          <GSTSelectorContext.Provider
            value={{
              selectedRows: gstSelectedRows,
              setSelectedRows: setGstSelectedRows,
            }}
          >
            <GSTSelectorModal
              borderRadius={width < 490 ? "md" : "none"}
              {...(width > 490 ? { ...{ flex: "1" } } : {})}
              size="lg"
              variant="primaryLightSolid"
            />
          </GSTSelectorContext.Provider>

          <SelectUnitMenu
            size="lg"
            {...(width > 490 ? { ...{ flex: "1.2" } } : {})}
            w={width < 490 ? "100%" : "initial"}
            borderLeftRadius={width < 490 ? "md" : "none"}
            borderRightRadius="md"
            variant="primaryLightSolid"
            allUnits={allUnits}
            selectedUnit={selectedUnit}
            setSelectedUnit={setSelectedUnit}
          />
        </Flex>
      ) : (
        <></>
      )}
      <Button
        size="lg"
        mt="3%"
        mb="5%"
        variant="primarySolid"
        onClick={handleUpdateProduct}
        position="unset"
        isLoading={loading}
      >
        <Flex flexDirection="row" gridGap={3}>
          <Text>Save</Text>
          <FaSave />
        </Flex>
      </Button>
    </Flex>
  );
};

export default UpdateProductValueForm;
