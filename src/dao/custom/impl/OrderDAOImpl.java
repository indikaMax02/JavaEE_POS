package dao.custom.impl;

import dao.CrudUtil;
import dao.custom.OrderDAO;
import entity.Orders;

import java.sql.SQLException;

public class OrderDAOImpl implements OrderDAO {
    @Override
    public boolean add(Orders dto) throws SQLException, ClassNotFoundException {
        return CrudUtil.executeUpdate("INSERT INTO `Order` (orderId, custId, date) VALUES (?,?,?)", dto.getOid(),dto.getCustId(),dto.getDate());
    }
}
