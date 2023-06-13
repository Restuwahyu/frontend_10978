<script>
/* eslint-disable */
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
      ],
      inputType: "Tambah",
      load: false,
      snackbar: false,
      dialog: false,
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
      let url = this.$api + "/transaksi_deposit_kelass";
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
  },
};
</script>

<template>
  <v-main class="AKT">
    <h3 class="text font-weight-medium mb-5">
      Data Transaksi Deposit Kelas Kadaluarsa
    </h3>
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="transaksi_deposit_kelass"
        :search="search"
      >
      </v-data-table>
    </v-card>
    <v-snackbar v-model="snackbar" :color="color" timeout="5000" top right>
      {{ error_message }}
    </v-snackbar>
  </v-main>
</template>
