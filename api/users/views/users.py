
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.decorators import action
from rest_framework import status
from rest_framework import mixins, viewsets, status
from rest_framework import generics
from django_filters import rest_framework as filters
from api.users.models import User
from api.users.serializers import UserModelRetrieveSerializer, UserLoginSerializer, SignupModelSerializer, UserModelSerializer
from rest_framework.permissions import (
        AllowAny,
        IsAuthenticated)



class UserViewSet(mixins.RetrieveModelMixin,
                  mixins.UpdateModelMixin,
                  mixins.ListModelMixin,
                  mixins.DestroyModelMixin,
                  viewsets.GenericViewSet,):

    def get_permissions(self):
        if self.action == 'login' or self.action == 'signup':
            permissions = [AllowAny]
        else:
            permissions = [IsAuthenticated]
        return [p() for p in permissions]

    filter_backends = (filters.DjangoFilterBackend,)
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
    lookup_field = 'username'

    def get_serializer_class(self):
        if self.action == 'retrieve' or self.action == 'list':
            return UserModelRetrieveSerializer       
        return UserModelSerializer

    
    @action(detail=False, methods=['post'])
    def signup(self, request):
        serializer = SignupModelSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        data = UserModelSerializer(user).data
        return Response(data, status=status.HTTP_201_CREATED)


    @action(detail=False, methods=['post'])
    def login(self, request):
        """User sign in."""
        serializer = UserLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user, token = serializer.save()
        data = {
            'user': UserModelRetrieveSerializer(user).data,
            'access_token': token
        }
        return Response(data, status=status.HTTP_201_CREATED)

