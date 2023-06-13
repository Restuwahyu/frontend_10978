<script>
/* eslint-disable */
export default {
  name: "Instruktur",
  data() {
    return {
      headers: [
        { text: "ID Instruktur", value: "id_instruktur" },
        {
          text: "Nama Instruktur",
          align: "start",
          sortable: true,
          value: "nama_instruktur",
        },
        { text: "Alamat", value: "alamat_instruktur" },
        { text: "Tanggal lahir", value: "tanggal_lahir_instruktur" },
        { text: "Nomor Telepon Instruktur", value: "no_telp_instruktur" },
        { text: "Email Instruktur", value: "email_instruktur" },
        { text: "Jam Terlambat", value: "jumlah_terlambat" },
        { text: "Action", value: "actions" },
      ],
      inputType: "Tambah",
      load: false,
      snackbar: false,
      dialog: false,
      dialogConfirm: false,
      dialogConfirmDelete: false,
      dialogConfirmEdit: false,
      dialogConfirmJumlahTerlambat: false,
      error_message: "",
      color: "",
      search: "",
      instruktur: new FormData(),
      instrukturs: [],
      form: {
        nama_instruktur: [],
        tanggal_lahir_instruktur: [],
        alamat_instruktur: [],
        password_instruktur: [],
        no_telp_instruktur: [],
        email_instruktur: [],
      },
      deleteId: "",
      showId: "",
      editId: "",
    };
  },
  methods: {
    setForm() {
      if (this.inputType === "Ubah") {
        this.Update();
      } else if (this.inputType === "Show") {
        this.showData();
      } else {
        this.Save();
      }
    },

    ReadData() {
      var url = this.$api + "/instruktur";
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response);
          this.instrukturs = response.data.data;
          this.error_message = response.data.message;
          this.color = "green";
          this.snackbar = true;
          this.load = false;
          this.Close();
          this.ReadData();
          this.ResetForm();
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
        });
    },

    Save() {
      this.instruktur.append("nama_instruktur", this.form.nama_instruktur);
      this.instruktur.append(
        "tanggal_lahir_instruktur",
        this.form.tanggal_lahir_instruktur
      );
      this.instruktur.append("alamat_instruktur", this.form.alamat_instruktur);
      this.instruktur.append(
        "password_instruktur",
        this.form.password_instruktur
      );
      this.instruktur.append(
        "no_telp_instruktur",
        this.form.no_telp_instruktur
      );
      this.instruktur.append("email_instruktur", this.form.email_instruktur);

      var url = this.$api + "/instruktur";
      this.load = true;
      this.$http
        .post(url, this.instruktur, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.error_message = response.data.message;
          this.color = "green";
          this.snackbar = true;
          this.load = true;
          this.Close();
          this.ReadData();
          this.ResetForm();
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
        });
    },

    Update() {
      var data = new FormData();
      data.append("nama_instruktur", this.form.nama_instruktur);
      data.append(
        "tanggal_lahir_instruktur",
        this.form.tanggal_lahir_instruktur
      );
      data.append("alamat_instruktur", this.form.alamat_instruktur);
      data.append("password_instruktur", this.form.password_instruktur);
      data.append("no_telp_instruktur", this.form.no_telp_instruktur);
      data.append("email_instruktur", this.form.email_instruktur);

      var url = this.$api + "/instruktur/" + this.editId;
      this.load = true;
      this.$http
        .post(url, data, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.error_message = response.data.message;
          this.color = "green";
          this.snackbar = true;
          this.load = false;
          this.Close();
          this.ReadData();
          this.ResetForm();
          this.inputType = "Tambah";
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
        });
    },

    ResetTerlambat() {
      var url = this.$api + "/instrukturs";
      this.load = true;
      this.$http
        .post(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.error_message = response.data.message;
          this.color = "green";
          this.snackbar = true;
          this.load = false;
          this.Close();
          this.ReadData();
          this.ResetForm();
          this.inputType = "Tambah";
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
        });
    },

    DeleteData() {
      //mengahapus data
      var url = this.$api + "/instruktur/" + this.deleteId;
      //data dihapus berdasarkan id
      this.$http
        .delete(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.error_message = response.data.message;
          this.color = "green";
          this.snackbar = true;
          this.load = false;
          this.Close();
          this.ReadData(); //mengambil data
          this.ResetForm();
          this.inputType = "Tambah";
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
        });
    },

    //Mengambil data dari DB
    EditHandler(item) {
      this.inputType = "Ubah";
      this.editId = item.id_instruktur;
      this.form.nama_instruktur = item.nama_instruktur;
      this.form.tanggal_lahir_instruktur = item.tanggal_lahir_instruktur;
      this.form.alamat_instruktur = item.alamat_instruktur;
      this.form.password_instruktur = item.password_instruktur;
      this.form.no_telp_instruktur = item.no_telp_instruktur;
      this.form.email_instruktur = item.email_instruktur;
      this.dialog = true;
    },

    DeleteHandler(id_instruktur) {
      this.deleteId = id_instruktur;
      this.dialogConfirmDelete = true;
    },

    Close() {
      this.dialog = false;
      this.inputType = "Tambah";
      this.dialogConfirm = false;
      this.dialogConfirmDelete = false;
      this.dialogConfirmEdit = false;
      this.dialogConfirmJumlahTerlambat = false;
      this.ReadData();
    },

    Batal() {
      this.ResetForm();
      this.ReadData();
      this.dialog = false;
      this.dialogConfirm = false;
      this.dialogConfirmDelete = false;
      this.dialogConfirmEdit = false;
      this.dialogConfirmJumlahTerlambat = false;
      this.inputType = "Tambah";
    },

    ResetForm() {
      this.form = {
        nama_instruktur: [],
        tanggal_lahir_instruktur: [],
        alamat_instruktur: [],
        password_instruktur: [],
        no_telp_instruktur: [],
        email_instruktur: [],
      };
    },
  },
  computed: {
    formTitle() {
      return this.inputType;
    },
  },
  mounted() {
    this.ReadData();
  },
};
</script>

<template>
  <v-main class="Instruktur">
    <h3 class="text font-weight-medium mb-5">Data Instruktur</h3>

    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-btn
          class="mx-2"
          fab
          dark
          color="red"
          @click="dialogConfirmJumlahTerlambat = true"
        >
          <v-icon dark> mdi-timer-refresh</v-icon>
        </v-btn>
        <v-btn class="mx-2" fab dark color="blue" @click="dialog = true">
          <v-icon dark> mdi-plus </v-icon>
        </v-btn>
      </v-card-title>
      <v-data-table :headers="headers" :items="instrukturs" :search="search">
        <template v-slot:item.actions="{ item }">
          <v-btn
            icon
            small
            class="mr-2 v-btn--floating"
            @click="EditHandler(item)"
          >
            <v-icon color="yellow">mdi-account-edit</v-icon>
          </v-btn>
          <v-btn
            icon
            small
            class="mr-2 v-btn--floating"
            @click="DeleteHandler(item.id_instruktur)"
          >
            <v-icon color="red">mdi-delete-forever</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>

    <!-- Membuat v-model dialog -->
    <v-dialog v-model="dialog" persistent max-width="1000px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }} Data Instruktur</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-text-field
              v-model="form.nama_instruktur"
              label="Nama Instruktur"
            ></v-text-field>
            <v-text-field
              type="date"
              v-model="form.tanggal_lahir_instruktur"
              label="Tanggal Lahir"
            ></v-text-field>
            <v-text-field
              v-model="form.alamat_instruktur"
              label="Alamat Instruktur"
            ></v-text-field>
            <v-text-field
              v-model="form.password_instruktur"
              label="Password Instruktur"
            ></v-text-field>
            <v-text-field
              v-model="form.no_telp_instruktur"
              label="Nomor Telepon Instruktur"
            ></v-text-field>
            <v-text-field
              v-model="form.email_instruktur"
              label="Email Instruktur"
            ></v-text-field>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="Batal"> Batal </v-btn>
          <v-btn color="blue darken-1" text @click="dialogConfirm = true">
            SIMPAN
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Membuat v-model dialog untuk konfirmasi menambahkan data-->
    <v-dialog v-model="dialogConfirm" max-width="300px">
      <v-card>
        <v-card-title class="headline">Konfirmasi</v-card-title>
        <v-card-text class="text-left">
          Apakah Anda yakin akan menambahkan data instruktur tersebut?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="Batal"> Batal </v-btn>
          <v-btn color="green darken-1" text @click="setForm"> Yakin </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Membuat v-model dialog untuk konfirmasi edit data-->
    <v-dialog v-model="dialogConfirmEdit" max-width="300px">
      <v-card>
        <v-card-title class="headline">Konfirmasi</v-card-title>
        <v-card-text class="text-left">
          Apakah Anda yakin akan menyimpan perubahan data instruktur tersebut?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="Batal"> Batal </v-btn>
          <v-btn color="green darken-1" text @click="setForm"> Yakin </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Membuat v-model dialog untuk konfirmasi hapus data-->
    <v-dialog v-model="dialogConfirmDelete" max-width="300px">
      <v-card>
        <v-card-title class="headline">Konfirmasi</v-card-title>
        <v-card-text class="text-left">
          Apakah Anda yakin akan menghapus data instruktur tersebut?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="Batal"> Batal </v-btn>
          <v-btn color="green darken-1" text @click="DeleteData"> Yakin </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Membuat v-model dialog untuk konfirmasi mereset jumlah terlambat instruktur-->
    <v-dialog v-model="dialogConfirmJumlahTerlambat" max-width="300px">
      <v-card>
        <v-card-title class="headline">Konfirmasi</v-card-title>
        <v-card-text class="text-left">
          Apakah Anda yakin akan mereset jumlah terlambat instruktur?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="Batal"> Batal </v-btn>
          <v-btn color="green darken-1" text @click="ResetTerlambat">
            Yakin
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar" :color="color" timeout="5000" top right>
      {{ error_message }}
    </v-snackbar>
  </v-main>
</template>
