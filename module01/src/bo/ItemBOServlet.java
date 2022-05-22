package bo;

import dao.DAOFactory;
import dao.SuperDAO;
import dao.custom.ItemDAO;
import entity.Customer;
import entity.Item;

import javax.json.*;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.ArrayList;

@WebServlet(urlPatterns = "/item")
public class ItemBOServlet extends HttpServlet {

    ItemDAO itemDAO = (ItemDAO) DAOFactory.getDaoFactory().getDAO(DAOFactory.DAOTypes.ITEM);


    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setStatus(HttpServletResponse.SC_CREATED);//201
        String option=req.getParameter("option");
        resp.setContentType("application/json");
        switch (option){


            case "GETONE" :

                try {


                    if(itemDAO.ifItemExist(req.getParameter("id"))){


                        Item item = itemDAO.search(req.getParameter("id"));

                        System.out.println(item.getCode()+" "+item.getDescription()+" "+item.getQtyOnHand()+" "+item.getUnitPrice());

                        JsonObjectBuilder jsonOb = Json.createObjectBuilder();
                        jsonOb.add("code",item.getCode());
                        jsonOb.add("desc",item.getDescription());
                        jsonOb.add("unitPrice",item.getUnitPrice());
                        jsonOb.add("qty",item.getQtyOnHand());

                        JsonObjectBuilder response = Json.createObjectBuilder();
                        response.add("status",200);
                        response.add("data",jsonOb.build());

                        PrintWriter writer = resp.getWriter();
                        writer.print(response.build());


                    }else {

                        JsonObjectBuilder response = Json.createObjectBuilder();
                        response.add("status",400);
                        response.add("message" , "Customer Not Found");
                        PrintWriter writer = resp.getWriter();
                        writer.print(response.build());


                    }




                } catch (SQLException e) {
                    JsonObjectBuilder response = Json.createObjectBuilder();
                    response.add("status", 400);
                    response.add("message", "Error");
                    response.add("data", e.getLocalizedMessage());
                    PrintWriter writer = resp.getWriter();
                    writer.print(response.build());

                    resp.setStatus(HttpServletResponse.SC_OK); //200


                    throw new RuntimeException(e);
                } catch (ClassNotFoundException e) {
                    JsonObjectBuilder response = Json.createObjectBuilder();
                    response.add("status", 400);
                    response.add("message", "Error");
                    response.add("data", e.getLocalizedMessage());
                    PrintWriter writer = resp.getWriter();
                    writer.print(response.build());

                    resp.setStatus(HttpServletResponse.SC_OK); //200

                    throw new RuntimeException(e);
                }
                break;


            case "GETALL" :

                try {
                    ArrayList<Item> allItem = itemDAO.getAll();

                    JsonArrayBuilder arrayBuilder = Json.createArrayBuilder();


                    for (Item item : allItem) {
                        JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                        objectBuilder.add("code", item.getCode());
                        objectBuilder.add("desc" , item.getDescription());
                        objectBuilder.add("unitPrice",item.getUnitPrice());
                        objectBuilder.add("qty", item.getQtyOnHand());

                        arrayBuilder.add(objectBuilder.build());

                    }
                    JsonObjectBuilder response = Json.createObjectBuilder();
                    response.add("status" , 200);
                    response.add("message" , "Done");
                    response.add("data" , arrayBuilder.build());

                    PrintWriter writer = resp.getWriter();
                    writer.print(response.build());




                } catch (SQLException e) {
                    JsonObjectBuilder response = Json.createObjectBuilder();
                    response.add("status", 400);
                    response.add("message", "Error");
                    response.add("data", e.getLocalizedMessage());
                    PrintWriter writer = resp.getWriter();
                    writer.print(response.build());

                    resp.setStatus(HttpServletResponse.SC_OK); //200

                    throw new RuntimeException(e);

                } catch (ClassNotFoundException e) {

                    JsonObjectBuilder response = Json.createObjectBuilder();
                    response.add("status", 400);
                    response.add("message", "Error");
                    response.add("data", e.getLocalizedMessage());
                    PrintWriter writer = resp.getWriter();
                    writer.print(response.build());

                    resp.setStatus(HttpServletResponse.SC_OK); //200

                    throw new RuntimeException(e);
                }
                break;

        }

    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        JsonReader reader = Json.createReader(req.getReader());
        JsonObject jsonObject = reader.readObject();

        String code = jsonObject.getString("code");
        String desc = jsonObject.getString("desc");
        String unitPrice = jsonObject.getString("unitPrice");
        String qty = jsonObject.getString("qty");

        PrintWriter writer = resp.getWriter();
        resp.setContentType("application/json");
        try {


            if (itemDAO.ifItemExist(code)){

                JsonObjectBuilder response = Json.createObjectBuilder();
                response.add("status", 400);
                response.add("message", "Item Add Fail");
                response.add("data", "");
                writer.print(response.build());

            }else {
                if(itemDAO.add(new Item(code, desc, unitPrice, qty))){

                    JsonObjectBuilder response = Json.createObjectBuilder();
                    response.add("status", 200);
                    response.add("message", "Successfully Added Item");
                    response.add("data", "");
                    writer.print(response.build());

                }
            }

        } catch (SQLException e) {

            throw new RuntimeException(e);
        } catch (ClassNotFoundException a) {

            throw new RuntimeException(a);
        }

    }


    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        String id = req.getParameter("id");
        PrintWriter writer = resp.getWriter();
        resp.setContentType("application/json");

        try {

            if(itemDAO.delete(id)){

                JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                objectBuilder.add("status", 200);
                objectBuilder.add("data", "");
                objectBuilder.add("message", "Successfully Deleted Item");
                writer.print(objectBuilder.build());

            }else {
                JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                objectBuilder.add("status", 400);
                objectBuilder.add("data", "");
                objectBuilder.add("message", "Item Delete Fail");
                writer.print(objectBuilder.build());
            }


        } catch (SQLException e) {
            JsonObjectBuilder response = Json.createObjectBuilder();
            response.add("status", 400);
            response.add("message", "Error");
            response.add("data", e.getLocalizedMessage());
            writer.print(response.build());

            resp.setStatus(HttpServletResponse.SC_OK); //200

            throw new RuntimeException(e);
        } catch (ClassNotFoundException e) {

            JsonObjectBuilder response = Json.createObjectBuilder();
            response.add("status", 400);
            response.add("message", "Error");
            response.add("data", e.getLocalizedMessage());
            writer.print(response.build());

            resp.setStatus(HttpServletResponse.SC_OK); //200

            throw new RuntimeException(e);
        }

    }
}
