from operator import itemgetter
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from authentication.models import User
from django.core.mail import send_mail


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

@api_view(['POST'])
def send_email(request):
  (msg_subject, msg_body) = itemgetter('msgSubject', 'msgBody')(request.data)
  try:
    send_mail(msg_subject, msg_body, 'atechchatterjeee@gmail.com', ['peechatterjee@gmail.com'], fail_silently=False)
    return Response(status=status.HTTP_200_OK)
  except: 
      return Response(status=status.HTTP_400_BAD_REQUEST)