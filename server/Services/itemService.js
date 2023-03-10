import { Items } from '../models';

class ItemServices {
  static getItems = async () => {
    try {
      const items = await Items.findAll({
        attributes: ['id', 'item_name', 'min_qty', 'qty', 'user'],
      });
      return items;
    } catch (error) {
      return error;
    }
  };

  static findItemByName = async (name) => {
    try {
      const item = await Items.findOne({ where: { item_name: name, flag: 1 } });
      return item;
    } catch (error) {
      return error;
    }
  };

  static registerItem = async (item_name, item_category, min_qty, userId, user) => {
    try {
      const result = await Items.create({
        item_name: item_name,
        item_category: item_category,
        min_qty: min_qty,
        UserId: userId,
        user: user,
      });
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };

  static findItemByByPk = async (id) => {
    const item = await Items.findByPk(id, {
      attributes: ['id', 'item_name', 'min_qty', 'qty'],
    });
    return item;
  };

  static removeItem = async (id) => {
    const result = await Items.destroy({ where: { id: id } });
    return result;
  };
}

export { ItemServices };
