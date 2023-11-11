from rest_framework import serializers
from Users.models import CustomUser
from django.contrib.auth.password_validation import validate_password


class RegistrationSerializer(serializers.ModelSerializer):
    verify_password = serializers.CharField(
        style={"input_type": "password"}, write_only=True
    )

    class Meta:
        model = CustomUser
        fields = ["email", "username", "password", "verify_password"]
        extra_kwargs = {"password": {"write_only": True}}

    def save(self):
        user = CustomUser(
            email=self.validated_data["email"], username=self.validated_data["username"]
        )

        password = self.validated_data["password"]
        verify_password = self.validated_data["verify_password"]

        if password != verify_password:
            raise serializers.ValidationError({"password": "Passwords must maatch"})
        user.set_password(password)
        user.save()
        return user
