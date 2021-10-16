from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from authentication.models import User


@api_view(['GET'])
def get_all_users(request):
  token = request.COOKIES.get('admin_token')
  print('cookies -> ', request.COOKIES)
  print('admin_token -> ', token)
  users = []

  if token is not None:
    all_users = User.objects.all()
    for user in all_users:
      users.append({
        "name": user.name,
        "email": user.email,
        "phNumber": user.phNumber,
      })
    return Response({"all_users": users}, status=status.HTTP_200_OK)
  else:
      return Response(status=status.HTTP_403_FORBIDDEN)
