import { Items } from '../models';
import { ItemServices } from '../Services/itemService';

class ItemsController {
  static fetchItems = async (req, res) => {
    try {
      const items = await ItemServices.getItems();
      res.send(items);
    } catch (error) {
      res.status(400).json({ error });
    }
  };

  static createItem = async (req, res) => {
    const { item_name, item_category, min_qty } = req.body;
    const userId = req.userId;
    const user = req.username;

    try {
      const itemExt = await ItemServices.findItemByName(item_name);
      if (itemExt) {
        res.json({ error: `item ${itemExt.item_name} already exists! Choose a new name` });
      } else {
        const response = await ItemServices.registerItem(item_name, item_category, min_qty, userId, user);
        if (response) {
          res.status(200).json(`${item_name} created successfully`);
        }
      }
    } catch (error) {
      res.status(400).json({ error: 'Error creating the item! Contact system Admin!' });
    }
  };

  static getItems = async (req, res) => {
    try {
      const items = await Items.findAll();
      res.status(200).send(items);
    } catch (error) {
      return res.send({ error });
    }
  };

  static updateItem = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    Items.update(data, { where: { id } })
      .then(() => {
        res.send(`Item with id ${id} has been updated successfully`);
      })
      .catch((error) => res.send({ error: error.message }));
  };

  static getById = async (req, res) => {
    const id = req.params.id;
    try {
      const item = await ItemServices.findItemByByPk(id);
      res.send(item);
    } catch (error) {
      res.send({ error });
    }
  };

  static deleteItem = async (req, res) => {
    const id = req.params.id;
    try {
      const record = await ItemServices.findItemByByPk(id);
      if (record) {
        const response = await ItemServices.removeItem(record.id);
        if (response) {
          res.send(`Item with id ${id} deleted successfully`);
        }
      } else {
        res.json({ error: `Item with ${id} already deleted!` });
      }
    } catch (error) {
      res.json({ error });
    }
  };
}

export { ItemsController };
