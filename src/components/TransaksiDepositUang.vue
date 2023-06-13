<script>
/* eslint-disable */
import jsPDF from "jspdf";
import "jspdf-autotable";

export default {
  name: "AKT",
  data() {
    return {
      headers: [
        { text: "ID Transaksi Deposit Uang", value: "id_deposito_uang" },

        { text: "No Struk", value: "no_struk" },
        {
          text: "Nama Member",
          align: "start",
          sortable: true,
          value: "nama_member",
        },
        {
          text: "Nama Promo",
          align: "start",
          sortable: true,
          value: "nama_promo",
        },
        { text: "Nama Pegawai", value: "nama_pegawai" },
        { text: "Tanggal Deposit", value: "tanggal_deposit" },
        { text: "Sisa Deposit", value: "sisa_deposit" },
        { text: "Nominal Deposit", value: "nominal_deposit" },
        { text: "Bonus Deposit", value: "bonus_deposit" },
        { text: "Total Deposit", value: "nominal_total" },
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
      transaksi_deposit_uang: new FormData(),
      transaksi_deposit_uangs: [],
      form: {
        id_member: [],
        id_pegawai: [],
        nominal_deposit: [],
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
      let url = this.$api + "/transaksi_deposit_uang";
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response);
          this.transaksi_deposit_uangs = response.data.data;
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

    Save() {
      this.transaksi_deposit_uang.append("id_member", this.form.id_member);
      this.transaksi_deposit_uang.append(
        "id_pegawai",
        localStorage.getItem("id_pegawai")
      );
      this.transaksi_deposit_uang.append(
        "nominal_deposit",
        this.form.nominal_deposit
      );
      console.log(this.form.id_member);
      console.log(this.form.id_pegawai);
      console.log(this.form.nominal_deposit);

      var url = this.$api + "/transaksi_deposit_uang/" + this.form.id_member;
      this.load = true;
      this.$http
        .post(url, this.transaksi_deposit_uang, {
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
        nominal_deposit: [],
      };
    },

    downloadPDF(
      $no_struk,
      $tanggal_deposit,
      $id_member,
      $nama_member,
      $nominal_deposit,
      $bonus_deposit,
      $sisa_deposit,
      $nominal_total
    ) {
      const doc = new jsPDF({
        orientation: "landscape",
        unit: "cm",
        format: [10, 17],
      });

      let url = this.$api + "/transaksi_deposit_uang";
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
      doc.text("Tanggal : " + $tanggal_deposit, 11, 2);

      doc.text(" ", 11, 3);
      doc.text(
        "Member                    : " + $id_member + " / " + $nama_member,
        0.5,
        4
      );
      doc.text(
        "Deposit                     : " + "Rp. " + $nominal_deposit + ",-",
        0.5,
        5
      );
      doc.text(
        "Bonus Deposit          : " + "Rp. " + $bonus_deposit + ",-",
        0.5,
        6
      );
      doc.text(
        "Sisa Deposit             : " + "Rp. " + $sisa_deposit + ",-",
        0.5,
        7
      );
      doc.text(
        "Total Deposit            : " + "Rp. " + $nominal_total + ",-",
        0.5,
        8
      );
      doc.text(
        "Kasir : " +
          localStorage.getItem("id_pegawai") +
          " / " +
          localStorage.getItem("nama_pegawai"),
        11,
        9
      );
      doc.save("Struk Deposito Uang -" + $id_member + ".pdf");
    },

    formatRP(item) {
      let val = (item / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
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
    <h3 class="text font-weight-medium mb-5">Data Transaksi Deposit Uang</h3>

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
        :items="transaksi_deposit_uangs"
        :search="search"
      >
        <template v-slot:item.sisa_deposit="{ item }">
          Rp.{{ formatRP(item.sisa_deposit) }}
        </template>
        <template v-slot:item.nominal_deposit="{ item }">
          Rp.{{ formatRP(item.nominal_deposit) }}
        </template>
        <template v-slot:item.bonus_deposit="{ item }">
          Rp.{{ formatRP(item.bonus_deposit) }}
        </template>
        <template v-slot:item.nominal_total="{ item }">
          Rp.{{ formatRP(item.nominal_total) }}
        </template>
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
                item.nominal_deposit,
                item.bonus_deposit,
                item.sisa_deposit,
                item.nominal_total,
                item.id_pegawai,
                item.nama_pegawai
              )
            "
          >
            <v-icon color="blue">mdi-download</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>

    <!-- Membuat v-model dialog Tambah-->
    <v-dialog v-model="dialogTambah" persistent max-width="1000px">
      <v-card>
        <v-card-title>
          <span class="headline">Tambah Data Transaksi Deposit Uang</span>
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
            <v-text-field
              type="number"
              v-model="form.nominal_deposit"
              label="Nominal Deposit (min. Rp.500.000,-)"
              item-value="nomina_deposit"
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
          Apakah Anda yakin akan menambahkan transaksi deposit uang tersebut?
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
