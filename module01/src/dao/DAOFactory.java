package dao;

import dao.custom.impl.CustomerDAOImpl;
import dao.custom.impl.ItemDAOImpl;
import dao.custom.impl.OrderDAOImpl;
import jdk.nashorn.internal.runtime.regexp.JoniRegExp;

public class DAOFactory {

    private static DAOFactory daoFactory;

    private DAOFactory(){

    }
    public static DAOFactory getDaoFactory(){
        if (daoFactory==null){
            daoFactory=new DAOFactory();
        }
        return daoFactory;
    }

    public enum DAOTypes{
        CUSTOMER, ITEM , ORDERS
    }

    public SuperDAO getDAO (DAOTypes types){
        switch (types){

            case CUSTOMER: return new CustomerDAOImpl();

            case ITEM   :  return new ItemDAOImpl();

            case ORDERS :  return new OrderDAOImpl();

            default     : return null;
        }
    }

}
