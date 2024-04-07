import { StyleSheet } from 'react-native';
import { global } from '../common/global_styles';

const styles = StyleSheet.create({
  chatItem: {
    backgroundColor: global.background,
    padding: 15,
    borderWidth: 1,
    borderColor: global.tertiary,
    borderRadius: 15,
  },
  chatItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  chatItemName: {
    color: global.secondary,
    fontWeight: 'bold',
    fontSize: 18,
    flex: 1,
    marginRight: 10,
  },
  chatItemMessage: {
    color: global.secondary,
    fontSize: 15,
    marginBottom: 5,
  },
  chatItemTime: {
    color: global.secondary,
    fontSize: 14,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: global.primary,
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    fontSize: 16,
    color: global.secondary,
  },
  chatItemMessageUnread: {
    color: global.secondary,
    fontSize: 15,
    fontWeight: 'bold',
  },
  unreadContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
});

export default styles;
