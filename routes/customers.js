// const googleTrends = require('google-trends-api');
exports.add = function (req, res) {
    res.render('add_customer', {
        page_title: "Add Customers - Node.js"
    });
};

exports.save = function (req, res) {
    var input = JSON.parse(JSON.stringify(req.body));
    req.getConnection(function (err, connection) {
        console.log(connection);
        var data = {
            name: input.name,
            address: input.address,
            email: input.email,
            phone: input.phone
        };
        var query = connection.query("INSERT INTO CUSTOMER set ? ", data, function (err, rows) {
            if (err) {
                console.log("Error inserting : %s ", err);
            } else {
                console.log("insert SUCCESS");
                res.redirect('/customers');
            }

        });
    });
};

exports.list = function (req, res) {

    req.getConnection(function (err, connection) {

        var query = connection.query('SELECT * FROM CUSTOMER', function (err, rows) {

            if (err)
                console.log("Error Selecting : %s ", err);

            res.render('customers', {
                page_title: "Customers - Node.js",
                data: rows
            });


        });

        //console.log(query.sql);
    });
   

};
exports.edit = function (req, res) {

    var id = req.params.id;

    req.getConnection(function (err, connection) {

        var query = connection.query('SELECT * FROM CUSTOMER WHERE id = ?', [id], function (err, rows) {

            if (err)
                console.log("Error Selecting : %s ", err);

            res.render('edit_customer', {
                page_title: "Edit Customers - Node.js",
                data: rows
            });


        });

        //console.log(query.sql);
    });
};
exports.save_edit = function (req, res) {
    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;
    req.getConnection(function (err, connection) {
        var data = {
            name: input.name,
            address: input.address,
            email: input.email,
            phone: input.phone
        };
        connection.query("UPDATE CUSTOMER set ? WHERE id = ? ", [data, id], function (err, rows) {
            if (err)
                console.log("Error Updating : %s ", err);
            res.redirect('/customers');
        });
    });
};
exports.delete_customer = function (req, res) {

    var id = req.params.id;

    req.getConnection(function (err, connection) {

        connection.query("DELETE FROM CUSTOMER  WHERE id = ? ", [id], function (err, rows) {

            if (err)
                console.log("Error deleting : %s ", err);

            res.redirect('/customers');

        });

    });
};