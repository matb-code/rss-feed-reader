from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated

from account.api.serializers import RegistrationSerializer, AccountSerializer


@api_view(['POST', ])
@authentication_classes([])
@permission_classes([])
def registration_view(request):

	if request.method == 'POST':
		serializer = RegistrationSerializer(data=request.data)
		data = {}
		if serializer.is_valid():
			account = serializer.save()
			data['response'] = 'successfully registered new user.'
			data['email'] = account.email
			data['display_name'] = account.display_name
		else:
			data = serializer.errors
		return Response(data)

@api_view(['POST',])
@permission_classes((IsAuthenticated,))
def account_info(request):
	user = request.user
	serialized_response = AccountSerializer(user)
	return Response(serialized_response.data)