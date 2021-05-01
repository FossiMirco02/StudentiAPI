class Student { //costruttore per ogni studente
    constructor(name, surname, sidicode, taxcode) {
        this.name = name; //nome
        this.surname = surname; //surname
        this.sidicode = sidicode; //sidicode
        this.taxcode = taxcode; //taxcode
    }
};


function CaricaPagina() { //funzione che si avvia al caricamento della pagina, fa vedere un solo form
    document.getElementById("form").style.display = "block";
    document.getElementById("newform").style.display = "none";
    richiestaelementi();
}

function richiestaelementi() { //richiese gli elementi da inserire nella pagina attraverso le API
    var richiesta = new XMLHttpRequest(); //richiesta in xml
    var persone = { table: "student", limit: 100 };
    var db = JSON.stringify(persone);
    richiesta.onreadystatechange = function() {
        if (this.status == 200) // se lo stato è 200, quindi una risposta andata a buon fine 
        {
            persone = JSON.parse(this.responseText);
            var elementi = "";
            for (i in persone) {
                elementi += "<tr><td>" + persone[i].name + "</td><td>" + persone[i].surname + "</td><td>" + persone[i].sidi_code + "</td><td>" + persone[i].tax_code + "</td><td><a src='img/modifica.jpg'></td><td><a src='rimuovi.png'></td></tr>";
            }
            document.getElementById("person").innerHTML = elementi;
        }
    };
    richiesta.open("GET", "http://localhost/EsStudenti/student.php", true);
    richiesta.setRequestHeader("Accept", "application/json");
    richiesta.send("i=" + db);
}



function aggiungi(studente) // aggiungere un studente
{
    try {
        if (studente == null) //se non si vuole aggiungere nessun studente lo schermo rimane come è
        {
            document.getElementById("form").style.display = "none";
            document.getElementById("newform").style.display = "block";
        } else {
            alert(studente);
            var student = new Student;
            student.name = prompt("Name: ");
            student.surname = prompt("Surname: ");
            student.sidicode = prompt("SidiCode: ");
            student.taxcode = prompt("TaxCode: ");
            aggiungiinserito(student); //chiama altra funzione
        }
    } catch (Exception) {
        //errore nell'aggiunta di una persona, riprova e cerca di inserire tutto senza errori
    }
}

function aggiungiinserito(student) //funzione per inserire il lavoratore nel database delle APi con il metodo PUT 
{
    var dati = {
        "name": student.name,
        "surname": student.surname,
        "sidi_code": student.sidicode,
        "tax_code": student.taxcode
    };
    $.ajax({ //richiesta da fare al "sito"
        url: "http://localhost/EsStudenti/student.php" + id,
        type: 'put',
        data: JSON.stringify(dati),
        contentType: 'application/json',
        success: function(data, textstatus, jQxhr) {
            location.reload();
        }
    });
}

function aggiungipersona() //aggiungere un lavoratore al database quando lo vogliamo inserire con metodo POST
{
    IdEmployer++;
    var dati = {
        "name": document.getElementById("namepersona").value,
        "surname": document.getElementById("surnamepersona").value,
        "sidi_code": document.getElementById("sidipersona").value,
        "tax_code": document.getElementById("taxpersona").value
    };
    $.ajax({ //richiesta al sito
        url: "http://localhost/EsStudenti/student.php",
        type: 'post',
        data: JSON.stringify(dati),
        contentType: 'application/json',
        success: function(data, textstatus, jQxhr) {
            location.reload();
        }
    });
}

function rimuovi(IdStudent) //rimuovere un lavoratore, o più di uno 
{
    try {
        if (IdStudent == null) //se non è stato selezionato nessun lavoratore va a controllare quelli selezionati  per trovare l'id di quelli selezionati
        {
            var selezionati = document.getElementsByName('checkbox');
            var n = selezionati.length;
            for (var i = 0; i < n; i++)
                if (selezionati[i].checked == true) {
                    rimuoviselezionato(selezionati[i].id);
                }
            location.reload();
        } else //se sa quale è quello selezionato 
        {
            if (confirm("rimuovo quelli selezionati...")) {
                rimuoviselezionato(IdStudent);
                location.reload();
            }
        }
    } catch (Exception) {
        //errore in qualcosa, provare a ricaricare la pagina e a rimuovere nuovamente
    }
}

function rimuoviselezionato(id) { //rimuovere una persona selezionata metodo DELETE
    $.ajax({
        url: "http://localhost/EsStudenti/student.php/?id=" + id,
        type: 'delete',
        contentType: 'String',
        success: function(data, textstatus, jQxhr) {
            location.reload();
        }
    });
}

function selezionaticheckbox(selected) //selezionare la riga in cui viene selezionata una checkbox nella pagina
{
    var checkbox = document.getElementsByName('checkbox');
    for (var i = 0, n = checkbox.length; i < n; i++) {
        checkbox[i].checked = selected.checked;
    }
}