from rest_framework import serializers
from Users.models import CustomUser
from django.contrib.auth.password_validation import validate_password


class RegistrationSerializer(serializers.ModelSerializer):
    """ "
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
