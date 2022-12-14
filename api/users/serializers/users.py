# Django REST Framework
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from rest_framework.validators import UniqueValidator

# Django 
from django.contrib.auth import password_validation, authenticate
from django.core.validators import RegexValidator
from rest_framework.authtoken.models import Token

# Models
from api.users.models import User
from api.marketing.models import BranchOffice

class UserModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class BranchOfficeModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = BranchOffice
        fields = ('id', 'owner', 'name_branch', 'commercial_business', 'dni_branch')

class UserModelRetrieveSerializer(serializers.ModelSerializer):
    
    branch_office_default = BranchOfficeModelSerializer() 
    
    def get_branch(self, profile):
        qs = BranchOffice.objects.filter(id=profile.branch_office_default.id)
        serializer = BranchOfficeModelSerializer(instance=qs, many=True)
        data = serializer.data
        return data

    class Meta:
        model = User
        fields = (
            'id',
            'first_name',
            'last_name',
            'username',
            'email',
            'phone_number',
            'name_enterprise',
            'dni',
            'type_user',
            'branch_office_default',
        )

class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(min_length=8, max_length=64)

    def validate(self, data):
        user = authenticate(username=data['email'], password=data['password'])
        if not user:
            raise serializers.ValidationError('Credenciales Invalidas')
        self.context['user'] = user
        return data

    def create(self, data):
        token, created = Token.objects.get_or_create(user=self.context['user'])
        return self.context['user'], token.key


class SignupModelSerializer(serializers.Serializer):

    email = serializers.EmailField(
        validators=[UniqueValidator(queryset=User.objects.all())]
    )

    username = serializers.CharField(
		min_length=4,
		max_length=20,
		validators=[UniqueValidator(queryset=User.objects.all())]
	)
    first_name = serializers.CharField(max_length=40, min_length=5)
    last_name = serializers.CharField(max_length=40, min_length=5)
    
    dni = serializers.CharField(
        max_length=15,
		validators=[UniqueValidator(queryset=User.objects.all())]
    )
    phone_number = serializers.CharField(max_length=15, required=False)
    
    name_enterprise = serializers.CharField(max_length=250, required=False)
    type_user = serializers.CharField()
    branch_office_default = serializers.CharField(required=False)

    password = serializers.CharField(min_length=8, max_length=64)
    password_confirmation = serializers.CharField(min_length=8, max_length=64)


    
    def validate(self, data):
        passwd = data['password']
        passwd_conf = data['password_confirmation']
        if passwd != passwd_conf:
            raise serializers.ValidationError("Contraseñas no coinciden")
        password_validation.validate_password(passwd)
        return data


    def create(self, data):
        data.pop('password_confirmation')
        if 'branch_office_default' in data:
            instance_branch_office = BranchOffice.objects.filter(id=data['branch_office_default']).first()
            if(instance_branch_office):
                data['branch_office_default'] = instance_branch_office
            else:
                raise serializers.ValidationError('Está sucursal no existe')


        if(data['type_user']=='CL'):
            if(data['name_enterprise']):
                user = User.objects.create_user(**data, is_active=True)
            else:
                raise serializers.ValidationError('Debes ingresar el nombre de la empresa en caso que sea un cliente!')
        else:
            user = User.objects.create_user(**data, is_active=True)
        return user


