package entity;


import java.time.LocalDate;

/**
 * @author : Sanu Vithanage
 * @since : 0.1.0
 **/
public class Orders {
    private String oid;
    private String custId;
    private String date;

    public Orders() {
    }

    public Orders(String oid, String custId, String date) {
        this.oid = oid;
        this.custId = custId;
        this.date = date;
    }

    public String getOid() {
        return oid;
    }

    public void setOid(String oid) {
        this.oid = oid;
    }

    public String getCustId() {
        return custId;
    }

    public void setCustId(String custId) {
        this.custId = custId;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}
