import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
interface ButtonProps {
  onPress: () => void;
  title: string;
}

const Button: React.FC<ButtonProps> = ({ onPress, title }) => {
  return (
    <>
      <View style={styles.space} />
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 25,
  },
  button: {
    padding: 4,
    borderRadius: 5,
    backgroundColor: 'gray',
  },
  space: {
    height: 10,
  },
});

export default Button;
