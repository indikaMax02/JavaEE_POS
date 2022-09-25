package dao.custom;

import dao.SuperDAO;
import entity.Orders;

import java.sql.SQLException;

public interface OrderDAO extends SuperDAO {
    public boolean add(Orders dto) throws SQLException, ClassNotFoundException;

}
