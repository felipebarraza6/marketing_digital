# Django REST Framework
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from rest_framework.validators import UniqueValidator

# Django 
from django.contrib.auth import password_validation, authenticate
from django.core.validators import RegexValidator

# Models
from api.users.models import User, ClientProfile


class SignupModelSerializer(serializers.Serializer):

    email = serializers.EmailField(
        validators=[UniqueValidator(queryset=User.objects.all())]
    )

    username = serializers.CharField(
		min_length=4,
		max_length=20,
		validators=[UniqueValidator(queryset=User.objects.all())]
	)
    
    dni = serializers.CharField(
        min_length=13,
		validators=[UniqueValidator(queryset=User.objects.all())]
    )
    
    type_user = serializers.CharField()
    name_enterprise = serializers.CharField(required=False)

    password = serializers.CharField(min_length=8, max_length=64)
    password_confirmation = serializers.CharField(min_length=8, max_length=64)

    def get_validation_exclusions(self):
        exclusions = super(SignupModelSerializer, self).get_validation_exclusions()
        return exclusions + ['name_enterprise']

    def validate(self, data):
        passwd = data['password']
        passwd_conf = data['password_confirmation']
        if passwd != passwd_conf:
            raise serializers.ValidationError("Contraseñas no coinciden")
        password_validation.validate_password(passwd)
        return data


    def create(self, data):
        data.pop('password_confirmation')
        user = User.objects.create_user(**data, is_active=True)

        if(data['type_user']=='CL'):
            if(data['name_enterprise'] is None):
                raise serializers.ValidationError('Debes ingresar el nombre de la empresa en caso que sea un cliente!')
            ClientProfile(user=user, name_enterprise=data['name_enterprise'])
        return user


