<script>
/* eslint-disable */
import jsPDF from "jspdf";
import "jspdf-autotable";

export default {
  name: "AKT",
  data() {
    return {
      headers: [
        { text: "ID Transaksi Deposit Kelas", value: "id_deposito_kelas" },
        { text: "No Struk", value: "no_struk" },
        { text: "Nama Member", value: "nama_member" },
        { text: "Nama Pegawai", value: "nama_pegawai" },
        { text: "Nama Promo", value: "nama_promo" },
        { text: "Tanggal Deposit", value: "tanggal_deposit" },
        { text: "Nominal Deposit", value: "nominal_deposit_kelas" },
        { text: "Bonus Deposit", value: "bonus_deposit" },
        { text: "Total Deposit", value: "nominal_total" },
        { text: "Nama Kelas", value: "nama_kelas" },
        { text: "Tanggal Kadaluarsa Paket", value: "tanggal_kadaluarsa" },
        { text: "Action", value: "actions" },
      ],
      inputType: "Tambah",
      load: false,
      snackbar: false,
      dialogTambah: false,
      dialogConfirm: false,
      dialogResetDepo: false,
      dialogResetDepoAll: false,
      error_message: "",
      color: "",
      search: "",
      transaksi_deposit_kelas: new FormData(),
      transaksi_deposit_kelass: [],
      form: {
        id_member: [],
        id_kelas: [],
        id_pegawai: [],
        tanggal_deposit: [],
        nominal_deposit_kelas: [],
        harga_kelas: [],
      },
      showId: "",
      harga_kelas: "",
      pegawaiList: [],
      memberList: [],
      kelasList: [],
      id_nama_pegawai: "",
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
      let url = this.$api + "/transaksi_deposit_kelas";
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response);
          this.transaksi_deposit_kelass = response.data.data;
          this.error_message = response.data.message;
          this.color = "green";
          this.snackbar = true;
          this.load = false;
        })
        .catch((error) => {
          console.log(error);
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
        });
    },

    ReadDataPegawai() {
      var url = this.$api + "/pegawai";
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response);
          this.pegawaiList = response.data.data;
        })
        .catch((error) => {
          console.log(error);
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
        });
    },

    ReadDataMember() {
      var url = this.$api + "/member";
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response);
          this.memberList = response.data.data;
        })
        .catch((error) => {
          console.log(error);
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
        });
    },

    ReadDataKelas() {
      var url = this.$api + "/kelas";
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response);
          this.kelasList = response.data.data;
        })
        .catch((error) => {
          console.log(error);
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
        });
    },

    ResetDepo() {
      var url = this.$api + "/transaksi_deposit_kelass/" + this.resetDepoId;
      this.$http
        .post(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response);
          this.Close();
        })
        .catch((error) => {
          console.log(error);
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
        });
    },

    ResetDepoAll() {
      var url = this.$api + "/transaksi_deposit_kelass";
      this.$http
        .post(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response);
          this.Close();
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
      this.transaksi_deposit_kelas.append("id_member", this.form.id_member);
      this.transaksi_deposit_kelas.append("id_kelas", this.form.id_kelas);
      this.transaksi_deposit_kelas.append(
        "id_pegawai",
        localStorage.getItem("id_pegawai")
      );
      this.transaksi_deposit_kelas.append(
        "nominal_deposit_kelas",
        this.form.nominal_deposit_kelas
      );

      var url = this.$api + "/transaksi_deposit_kelas/" + this.form.id_member;
      this.load = true;
      this.$http
        .post(url, this.transaksi_deposit_kelas, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response);
          this.error_message = response.data.message;
          this.load = true;
          this.Close();
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

    ResetDepoHandler(item) {
      this.resetDepoId = item.id_deposito_kelas;
      this.dialogResetDepo = true;
    },

    Close() {
      this.dialogTambah = false;
      this.inputType = "Tambah";
      this.dialogConfirm = false;
      this.dialogResetDepo = false;
      this.dialogResetDepoAll = false;
      this.ReadData();
    },

    Batal() {
      this.ResetForm();
      this.ReadData();
      this.dialogTambah = false;
      this.dialogConfirm = false;
      this.dialogResetDepo = false;
      this.dialogResetDepoAll = false;
      this.inputType = "Tambah";
    },

    ResetForm() {
      this.form = {
        id_member: [],
        id_pegawai: [],
        tanggal_deposit: [],
        nominal_deposit_kelas: [],
      };
    },

    downloadPDF(
      $no_struk,
      $tanggal_deposit,
      $id_member,
      $nama_member,
      $nominal_deposit_kelas,
      $bonus_deposit,
      $total_harga,
      $harga_kelas,
      $nama_kelas,
      $tanggal_kadaluarsa
    ) {
      const doc = new jsPDF({
        orientation: "landscape",
        unit: "cm",
        format: [12, 27],
      });

      let url = this.$api + "/transaksi_deposit_kelas";
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response);
          this.transaksi_deposit_kelas = response.data.data;
        })
        .catch((error) => {
          console.log(error);
          this.error_message = error.response.data.message;
        });

      let urls = this.$api + "/pegawai";
      this.$http
        .get(urls, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response);
          this.pegawaiList = response.data.data;
        })
        .catch((error) => {
          console.log(error);
          this.error_message = error.response.data.message;
        });

      let urlss = this.$api + "/kelas";
      this.$http
        .get(urlss, {
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

      doc.text("Go Fit", 1, 1);
      doc.text("No Struk : " + $no_struk, 20, 1);
      doc.text("Jl. Centralpark No.10 Yogyakarta", 1, 2);
      doc.text("Tanggal : " + $tanggal_deposit, 20, 2);
      doc.text(" ", 20, 3);
      doc.text(
        "Member" +
          "                                          : " +
          $id_member +
          " / " +
          $nama_member,
        1,
        4
      );
      doc.text(
        "Deposit (bayar " +
          $nominal_deposit_kelas +
          " gratis " +
          $bonus_deposit +
          ")" +
          "             : Rp. " +
          $total_harga +
          ",- (" +
          $nominal_deposit_kelas +
          " X Rp." +
          $harga_kelas +
          ")",
        1,
        5
      );
      doc.text(
        "Jenis Kelas" + "                                     : " + $nama_kelas,
        1,
        6
      );
      doc.text(
        "Total Deposit " +
          $nama_kelas +
          "          : " +
          $nominal_deposit_kelas,
        1,
        7
      );
      doc.text(
        "Berlaku sampai dengan" + "                  : " + $tanggal_kadaluarsa,
        1,
        8
      );
      doc.text(" ", 20, 9);
      doc.text(
        "Kasir : " +
          localStorage.getItem("id_pegawai") +
          " / " +
          localStorage.getItem("nama_pegawai"),
        20,
        10
      );
      doc.save("Struk Deposito Uang -" + $id_member + ".pdf");
    },
  },
  computed: {
    formTitle() {
      return this.inputType;
    },
  },
  mounted() {
    this.ReadData();
    this.ReadDataPegawai();
    this.ReadDataMember();
    this.ReadDataKelas();
    this.id_nama_pegawai =
      localStorage.getItem("id_pegawai") +
      "-" +
      localStorage.getItem("nama_pegawai");
  },
};
</script>

<template>
  <v-main class="AKT">
    <h3 class="text font-weight-medium mb-5">Data Transaksi Deposit Kelas</h3>
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
          color="grey"
          @click="dialogResetDepoAll = true"
        >
          <v-icon dark> mdi-credit-card-remove </v-icon>
        </v-btn>
        <v-btn class="mx-2" fab dark color="blue" @click="dialogTambah = true">
          <v-icon dark> mdi-plus </v-icon>
        </v-btn>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="transaksi_deposit_kelass"
        :search="search"
      >
        <template v-slot:item.actions="{ item }">
          <v-btn
            icon
            small
            class="mr-2 v-btn--floating"
            color="primary"
            @click="
              downloadPDF(
                item.no_struk,
                item.tanggal_deposit,
                item.id_member,
                item.nama_member,
                item.nominal_deposit_kelas,
                item.bonus_deposit,
                item.total_harga,
                item.harga_kelas,
                item.nama_kelas,
                item.tanggal_kadaluarsa,
                item.id_pegawai,
                item.nama_pegawai
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
            @click="ResetDepoHandler(item)"
          >
            <v-icon color="grey">mdi-credit-card-refresh</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>

    <!-- Membuat v-model dialog tambah -->
    <v-dialog v-model="dialogTambah" persistent max-width="1000px">
      <v-card>
        <v-card-title>
          <span class="headline">Tambah Data Transaksi Deposit Kelas</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-text-field
              v-model="id_nama_pegawai"
              label="Nama Pegawai"
              item-value="id_pegawai"
              disabled
            ></v-text-field>
            <v-select
              v-model="form.id_member"
              label="Nama Member"
              :items="memberList"
              item-text="nama_member"
              item-value="id_member"
            ></v-select>
            <v-select
              v-model="form.id_kelas"
              label="Nama Kelas"
              :items="kelasList"
              item-text="nama_kelas"
              item-value="id_kelas"
            ></v-select>
            <v-select
              type="number"
              v-model="form.nominal_deposit_kelas"
              label="Nominal Deposit"
              :items="[5, 10]"
            ></v-select>
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
          Apakah Anda yakin akan menambahkan transaksi deposit kelas tersebut?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="Batal"> Batal </v-btn>
          <v-btn color="green darken-1" text @click="setForm"> Yakin </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Membuat v-model dialog untuk konfirmasi reset data transaksi-->
    <v-dialog v-model="dialogResetDepo" max-width="300px">
      <v-card>
        <v-card-title class="headline">Konfirmasi</v-card-title>
        <v-card-text class="text-left">
          Apakah Anda yakin akan reset transaksi deposit kelas tersebut?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="Batal"> Batal </v-btn>
          <v-btn color="green darken-1" text @click="ResetDepo"> Yakin </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Membuat v-model dialog untuk konfirmasi reset data transaksi-->
    <v-dialog v-model="dialogResetDepoAll" max-width="300px">
      <v-card>
        <v-card-title class="headline">Konfirmasi</v-card-title>
        <v-card-text class="text-left">
          Apakah Anda yakin akan reset transaksi deposit kelas yang telah
          kadaluarsa ?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="Batal"> Batal </v-btn>
          <v-btn color="green darken-1" text @click="ResetDepoAll">
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
