from rest_framework import serializers
from Users.models import CustomUser
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class UserSerializer(serializers.ModelSerializer):
    """
    A serializer for the CustomUser model.

    This serializer is used to convert CustomUser instances into a format that
    can be easily rendered into JSON. It defines the fields that are exposed
    through the API when a CustomUser instance is serialized.
    """

    class Meta:
        """
        Inner class that specifies the details about serialization.

        Attributes:
        model: The model class (CustomUser) that is being serialized.
        fields: A list of field names that are included in the serialized output.
        """

        model = CustomUser
        fields = ["id", "username", "email", "first_name", "last_name"]


class TokenObtainPairSerializerUserId(TokenObtainPairSerializer):
    """
    A serializer that extends TokenObtainPairSerializer to include user ID.

    This serializer is used during the token authentication process. It extends
    the default TokenObtainPairSerializer by adding the user's ID to the response
    after a successful authentication.
    """

    def validate(self, attrs):
        """
        Validate and authenticate the user, and return the token pair.

        This method is called when the serializer is used to validate an incoming
        request. It first calls the superclass's validate method to perform
        authentication and token generation, then adds the user ID to the response.

        Args:
        attrs: The authentication attributes, typically including username and password.

        Returns:
        A dictionary containing the access and refresh tokens, along with the user's ID.
        """
        # Retrieve default token response
        data = super().validate(attrs)

        # Add the user ID to the response
        data["user_id"] = self.user.id
        return data


class RegistrationSerializer(serializers.ModelSerializer):
    """
    Registration serializer used for deserializing incoming post request, cleansing, validating, and saving user model.

    This serializer is responsible for creation of a new user. Incoming data is sanitized and validated. Two methods are overriden,
    def validate_email and def_save. Validate_email queries database and ensures that incoming email is not already used as this is not
    in the default Django behaviour. Save checks to see if the two passwords are the same.

    Parameters: inherits from serializers.ModelSerializer.

    Returns
        - A newly created user object if sucessful
        - Raises appropriate errors if unsuccesful which is processed by the register_user view
    """

    verify_password = serializers.CharField(
        style={"input_type": "password"}, write_only=True
    )

    class Meta:
        model = CustomUser
        fields = ["email", "username", "password", "verify_password"]
        extra_kwargs = {"password": {"write_only": True}}

    def validate_email(self, value):
        """
        Overriden method ensuring that email is unique to user.
        """
        if CustomUser.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with that email already exists.")
        return value

    def save(self):
        """
        Overriden method which checks if password and verify_password are correct
        """
        user = CustomUser(
            email=self.validated_data["email"], username=self.validated_data["username"]
        )

        password = self.validated_data["password"]
        verify_password = self.validated_data["verify_password"]

        if password != verify_password:
            raise serializers.ValidationError({"password": "Passwords must match"})
        user.set_password(password)
        user.save()
        return user

class UpdateUserSerializer(serializers.Serializer):
    """
    Serializer to validate fields for updating an CustomUser.

    When an instance of this class is initialized it has to be passed the request files
    as a parameter. After it is initialized .is_valid() should be called to validate that
    the image passed is valid.

    If .is_valid() returns false, the .errors property will be populated.

    If .is_valid() returns true, the .validated_data property will be populated and the .update()
    method can be called to update an instance of an CustomUser in the database.
    """
    email = serializers.EmailField()
    firstname = serializers.CharField()
    lastname = serializers.CharField()
    latitude = serializers.DecimalField()
    longitude = serializers.DecimalField()

    def update(self, instance, validated_data):
        """
        update method executes when UpdateUserSerializer.save() is called in advertisements/api/views.py
        and an instance of an existing CustomUser is included.

        Will save an updated instance of the CustomUser in the database.

        Returns an instance of the CustomUser that was saved.
        """
        instance.email = validated_data.get('email', instance.email)
        instance.firstname = validated_data.get('firstname', instance.firstname)
        instance.lastname = validated_data.get('lastname', instance.lastname)
        instance.latitude = validated_data.get('latitude', instance.latitude)
        instance.longitude = validated_data.get('longitude', instance.longitude)
        instance.save()
        return instance