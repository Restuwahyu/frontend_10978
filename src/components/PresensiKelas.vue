<script>
/* eslint-disable */
import jsPDF from "jspdf";
import "jspdf-autotable";

export default {
  name: "PG",
  data() {
    return {
      headers: [
        { text: "ID Presensi Gym", value: "id_booking_kelas" },
        { text: "Nama Member", value: "nama_member" },
        { text: "Nama Kelas", value: "nama_kelas" },
        { text: "Tanggal Booking", value: "tanggal_booking_kelas" },
        { text: "Tanggal Presensi", value: "tanggal_presensi" },
        { text: "Jenis Pembayaran", value: "jenis_pembayaran" },
        { text: "Status", value: "status" },
        { text: "Action", value: "actions" },
      ],
      inputType: "Tambah",
      load: false,
      snackbar: false,
      dialog: false,
      dialogConfirm: false,
      dialogConfirmDelete: false,
      dialogConfirmEdit: false,
      error_message: "",
      color: "",
      search: "",
      presensi_gym: new FormData(),
      presensi_gyms: [],
      form: {
        id_instruktur: [],
        id_kelas: [],
        status: [],
      },
      showId: "",
      editId: "",
      bookingGymList: [],
      memberList: [],
      sesiList: [],
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
      let url = this.$api + "/booking_kelas";
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response);
          this.presensi_gyms = response.data.data;
          this.error_message = response.data.message;
          this.color = "green";
          this.snackbar = true;
          this.load = true;
        })
        .catch((error) => {
          console.log(error);
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
        });
    },

    Save() {
      var url = this.$api + "/presensi_gym";
      this.load = true;
      this.$http
        .post(url, this.presensi_gym, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response);
          this.error_message = response.data.message;
          this.color = "green";
          this.snackbar = true;
          this.load = true;
          this.Close();
          this.ReadData();
          this.ResetForm();
        })
        .catch((error) => {
          console.log(error);
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
        });
    },

    Close() {
      this.dialog = false;
      this.inputType = "Tambah";
      this.dialogConfirm = false;
      this.dialogConfirmDelete = false;
      this.dialogConfirmEdit = false;
      this.ReadData();
    },

    Batal() {
      this.ResetForm();
      this.ReadData();
      this.dialog = false;
      this.dialogConfirm = false;
      this.dialogConfirmDelete = false;
      this.dialogConfirmEdit = false;
      this.inputType = "Tambah";
    },

    ResetForm() {
      this.form = {
        id_instruktur: [],
        id_kelas: [],
        status: [],
        tanggal_presensi_gym: [],
      };
    },

    Update() {
      var url = this.$api + "/booking_kelass/" + this.editId;
      this.load = true;

      this.$http
        .post(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response);
          this.error_message = response.data.message;
          this.color = "green";
          this.snackbar = true;
          this.load = false;
          this.ReadData();
          this.Close();
          this.inputType = "Tambah";
        })
        .catch((error) => {
          console.log(error);
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
        });
    },

    EditHandler(item) {
      this.inputType = "Ubah";
      this.editId = item.id_booking_kelas;
      console.log(this.editId);
      this.dialogConfirmEdit = true;
    },

    downloadPaketPDF(
      $no_struk,
      $tanggal_presensi,
      $id_member,
      $nama_member,
      $nama_kelas,
      $nama_instruktur,
      $total_deposit_paket,
      $tgl_kadaluarsa_paket
    ) {
      const doc = new jsPDF({
        orientation: "landscape",
        unit: "cm",
        format: [14, 13],
      });

      let url = this.$api + "/sesi";
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response);
          this.List = response.data.data;
        })
        .catch((error) => {
          console.log(error);
          this.error_message = error.response.data.message;
        });
      doc.setFont("helvetica", "bold");
      doc.text("GoFit", 1, 1);
      doc.setFont("helvetica", "normal");
      doc.text("Jl. Centralpark No.10 Yogyakarta", 1, 2);
      doc.text(" ", 20, 3);
      doc.setFont("helvetica", "bold");
      doc.text("STRUK PRESENSI KELAS PAKET", 1, 4);
      doc.setFont("helvetica", "normal");
      doc.text("No Struk            : " + $no_struk, 1, 5);
      doc.text("Tanggal             : " + $tanggal_presensi, 1, 6);
      doc.text(" ", 20, 7);
      doc.text(
        "Member             : " + $id_member + " / " + $nama_member,
        1,
        8
      );
      doc.text("Kelas                 : " + $nama_kelas, 1, 9);
      doc.text("Instruktur           : " + $nama_instruktur, 1, 10);
      doc.text("Sisa Deposit      : " + $total_deposit_paket + "x", 1, 11);
      doc.text("Berlaku Sampai : " + $tgl_kadaluarsa_paket, 1, 12);
      doc.save("Struk Presensi Kelas Paket -" + $id_member + ".pdf");
    },

    downloadPDF(
      $no_struk,
      $tanggal_presensi,
      $id_member,
      $nama_member,
      $nama_kelas,
      $nama_instruktur,
      $harga_kelas,
      $total_deposit_uang
    ) {
      const doc = new jsPDF({
        orientation: "landscape",
        unit: "cm",
        format: [14, 13],
      });

      let url = this.$api + "/sesi";
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response);
          this.List = response.data.data;
        })
        .catch((error) => {
          console.log(error);
          this.error_message = error.response.data.message;
        });
      doc.setFont("helvetica", "bold");
      doc.text("GoFit", 1, 1);
      doc.setFont("helvetica", "normal");
      doc.text("Jl. Centralpark No.10 Yogyakarta", 1, 2);
      doc.text(" ", 20, 3);
      doc.setFont("helvetica", "bold");
      doc.text("STRUK PRESENSI KELAS PAKET", 1, 4);
      doc.setFont("helvetica", "normal");
      doc.text("No Struk            : " + $no_struk, 1, 5);
      doc.text("Tanggal             : " + $tanggal_presensi, 1, 6);
      doc.text(" ", 20, 7);
      doc.text(
        "Member             : " + $id_member + " / " + $nama_member,
        1,
        8
      );
      doc.text("Kelas                 : " + $nama_kelas, 1, 9);
      doc.text("Instruktur           : " + $nama_instruktur, 1, 10);
      doc.text("Tarif                   : Rp." + $harga_kelas, 1, 11);
      doc.text("Sisa Deposit      : Rp." + $total_deposit_uang, 1, 12);
      doc.save("Struk Presensi Kelas Reguler -" + $id_member + ".pdf");
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
  <v-main class="PG">
    <h3 class="text font-weight-medium mb-5">Data Presensi Kelas</h3>

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
        <v-btn class="mx-2" fab dark color="blue" @click="Save()">
          <v-icon dark> mdi-plus </v-icon>
        </v-btn>
      </v-card-title>
      <v-data-table :headers="headers" :items="presensi_gyms" :search="search">
        <template v-slot:item.actions="{ item }">
          <v-btn
            v-if="
              item.status == 'Telah Dipresensi' &&
              item.jenis_pembayaran == 'Deposit Kelas'
            "
            icon
            small
            class="mr-2 v-btn--floating"
            color="primary"
            @click="
              downloadPaketPDF(
                item.no_struk,
                item.tanggal_presensi,
                item.id_member,
                item.nama_member,
                item.nama_kelas,
                item.nama_instruktur,
                item.total_deposit_paket,
                item.tgl_kadaluarsa_paket
              )
            "
          >
            <v-icon color="blue">mdi-download</v-icon> </v-btn
          ><v-btn
            v-if="
              item.status == 'Telah Dipresensi' &&
              item.jenis_pembayaran == 'Deposit Uang'
            "
            icon
            small
            class="mr-2 v-btn--floating"
            color="primary"
            @click="
              downloadPDF(
                item.no_struk,
                item.tanggal_presensi,
                item.id_member,
                item.nama_member,
                item.nama_kelas,
                item.nama_instruktur,
                item.harga_kelas,
                item.total_deposit_uang
              )
            "
          >
            <v-icon color="blue">mdi-download</v-icon>
          </v-btn>
          <v-btn
            icon
            small
            class="mr-2 v-btn--floating"
            color="primary"
            @click="EditHandler(item)"
          >
            <v-icon color="yellow">mdi-account-edit</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
    <!-- Membuat v-model dialog untuk konfirmasi edit data-->
    <v-dialog v-model="dialogConfirmEdit" max-width="300px">
      <v-card>
        <v-card-title class="headline">Konfirmasi</v-card-title>
        <v-card-text class="text-left">
          Apakah Anda yakin akan menyimpan perubahan data member tersebut?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="Batal"> Batal </v-btn>
          <v-btn color="green darken-1" text @click="setForm"> Yakin </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar" :color="color" timeout="5000" top right>
      {{ error_message }}
    </v-snackbar>
  </v-main>
</template>
