<script>
/* eslint-disable */
import jsPDF from "jspdf";
import "jspdf-autotable";

export default {
  name: "AKT",
  data() {
    return {
      headers: [
        { text: "ID Transaksi Aktivasi", value: "id_aktivasi" },

        { text: "No Struk", value: "no_struk" },
        {
          text: "Nama Member",
          align: "start",
          sortable: true,
          value: "nama_member",
        },
        { text: "Nama Pegawai", value: "nama_pegawai" },
        { text: "Tanggal Aktivasi", value: "tanggal_aktivasi" },
        { text: "Tanggal Kadaluarsa", value: "tanggal_kadaluarsa" },
        { text: "Action", value: "actions" },
      ],
      inputType: "Tambah",
      load: false,
      snackbar: false,
      dialogTambah: false,
      dialogConfirm: false,
      error_message: "",
      color: "",
      search: "",
      transaksi_aktivasi: new FormData(),
      transaksi_aktivasis: [],
      form: {
        id_member: [],
        id_pegawai: [],
      },
      showId: "",
      pegawaiList: [],
      memberList: [],
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
      let url = this.$api + "/transaksi_aktivasi";
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response);
          this.transaksi_aktivasis = response.data.data;
          this.error_message = response.data.message;
          this.color = "green";
          this.snackbar = true;
          this.load = false;
        })
        .catch((error) => {
          console.log(error);
          console.log(localStorage.getItem("id_pegawai"));
          console.log(localStorage.getItem("nama_pegawai"));
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

    Save() {
      this.transaksi_aktivasi.append(
        "id_pegawai",
        localStorage.getItem("id_pegawai")
      );
      this.transaksi_aktivasi.append("id_member", this.form.id_member);

      var url = this.$api + "/transaksi_aktivasi";
      this.load = true;
      this.$http
        .post(url, this.transaksi_aktivasi, {
          id_pegawai: localStorage.getItem("id_pegawai"),
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
      this.dialogTambah = false;
      this.inputType = "Tambah";
      this.dialogConfirm = false;
      this.ReadData();
    },

    Batal() {
      this.ResetForm();
      this.ReadData();
      this.dialogTambah = false;
      this.dialogConfirm = false;
      this.inputType = "Tambah";
    },

    ResetForm() {
      this.form = {
        id_member: [],
        id_pegawai: [],
      };
    },

    downloadPDF(
      $no_struk,
      $id_member,
      $tanggal_aktivasi,
      $tanggal_kadaluarsa,
      $nama_member
    ) {
      const doc = new jsPDF({
        orientation: "landscape",
        unit: "cm",
        format: [8, 17],
      });

      let url = this.$api + "/transaksi_aktivasi";
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
        });

      doc.text("Go Fit", 0.5, 1);
      doc.text("No Struk : " + $no_struk, 11, 1);
      doc.text("Jl. Centralpark No.10 Yogyakarta", 0.5, 2);
      doc.text("Tanggal : " + $tanggal_aktivasi, 11, 2);
      doc.text("", 0.5, 3);
      doc.text(
        "Member                    : " + $id_member + " / " + $nama_member,
        0.5,
        4
      );
      doc.text("Aktivasi Tahunan      : Rp. 3.000.000 ", 0.5, 5);
      doc.text("Masa aktif member   : " + $tanggal_kadaluarsa, 0.5, 6);
      doc.text(
        "Kasir : " +
          localStorage.getItem("id_pegawai") +
          " / " +
          localStorage.getItem("nama_pegawai"),
        11,
        7
      );
      doc.save("Struk Aktivasi-" + $id_member + ".pdf");
    },

    id_nama_member(item) {
      return `${item.id_member} - ${item.nama_member}`;
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
    this.id_nama_pegawai =
      localStorage.getItem("id_pegawai") +
      " - " +
      localStorage.getItem("nama_pegawai");
  },
};
</script>

<template>
  <v-main class="AKT">
    <h3 class="text font-weight-medium mb-5">Data Transaksi Aktivasi</h3>

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
        <v-btn class="mx-2" fab dark color="blue" @click="dialogTambah = true">
          <v-icon dark> mdi-plus </v-icon>
        </v-btn>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="transaksi_aktivasis"
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
                item.id_member,
                item.tanggal_aktivasi,
                item.tanggal_kadaluarsa,
                item.nama_member
              )
            "
          >
            <v-icon color="blue">mdi-download</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>

    <!-- Membuat v-model dialog tambah-->
    <v-dialog v-model="dialogTambah" persistent max-width="1000px">
      <v-card>
        <v-card-title>
          <span class="headline">Tambah Data Transaksi Aktivasi</span>
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
              :item-text="id_nama_member"
              item-value="id_member"
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
          Apakah Anda yakin akan menambahkan transaksi aktivasi tersebut?
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
