package dao.custom.impl;

import dao.CrudUtil;
import dao.custom.ItemDAO;
import entity.Customer;
import entity.Item;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class ItemDAOImpl implements ItemDAO {
    @Override
    public boolean add(Item item) throws SQLException, ClassNotFoundException {
      return   CrudUtil.executeUpdate("INSERT INTO Item(code,name,unitPrice,qty) VALUES(?,?,?,?)",item.getCode(),item.getDescription(),item.getUnitPrice(),item.getQtyOnHand());
    }

    @Override
    public boolean delete(String s) throws SQLException, ClassNotFoundException {
        return false;
    }

    @Override
    public boolean update(Item item) throws SQLException, ClassNotFoundException {
        return false;
    }

    @Override
    public Item search(String s) throws SQLException, ClassNotFoundException {
        return null;
    }

    @Override
    public ArrayList<Item> getAll() throws SQLException, ClassNotFoundException {
        ArrayList<Item> allItems=new ArrayList<>();
        ResultSet resultSet = CrudUtil.executeQuery("SELECT * FROM Item");
        while (resultSet.next()){
            allItems.add(new Item(resultSet.getString("code"),resultSet.getString("name"),resultSet.getString("unitPrice"),resultSet.getString("qty")));
        }
        return allItems;
    }

    @Override
    public boolean ifItemExist(String code) throws SQLException, ClassNotFoundException {
        return CrudUtil.executeQuery("SELECT code FROM Item WHERE code=?", code).next();
    }
}
