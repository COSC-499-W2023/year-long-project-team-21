from Messages.models import Message
from .test_setup import TestSetUpCreateMessage

class TestModels(TestSetUpCreateMessage):

    def test_create_new_msg(self):
        """
        Test if created test msg exists in database
        """
        message = Message.objects.get(pk=1)
        self.assertEqual(message.msg, "test msg")
