from Messages.models import Message
from .test_setup import TestSetUpSendMessage

class TestModels(TestSetUpSendMessage):

    def test_create_new_msg(self):
        """
        Test if created test msg exists in database
        """
        message = Message.objects.create(
            msg="Hey!",
            sender_id=self.user_1.id,
            receiver_id=self.user_2.id,
            time_sent="2024-02-10T12:30:00.000000Z",
            ad_id = self.ad
        )

        # assert msg exists
        new_msg = Message.objects.get(pk=message.id)
        self.assertEqual(new_msg.msg, "Hey!")
