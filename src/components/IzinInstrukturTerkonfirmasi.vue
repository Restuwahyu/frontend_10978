<script>
/* eslint-disable */
export default {
  name: "IZN",
  data() {
    return {
      headers: [
        { text: "ID Izin Instruktur", value: "id_izin_instruktur" },
        { text: "Nama Instruktur", value: "id_instruktur" },
        { text: "Status", value: "status_izin" },
        { text: "Keterangan", value: "alasan_izin" },
        { text: "Instruktur Pengganti", value: "id_instruktur_pengganti" },
      ],
      inputType: "Tambah",
      load: false,
      snackbar: false,
      dialog: false,
      dialogConfirm: false,
      error_message: "",
      color: "",
      search: "",
      izin_instruktur: new FormData(),
      izin_instrukturs: [],
      showId: "",
      instrukturList: [],
      status_izin_text: "Belum Dikonfirmasi",
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
      let url = this.$api + "/izin_instruktur";
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response);
          this.izin_instrukturs = response.data.data;
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

    ReadDataInstruktur() {
      var url = this.$api + "/instruktur";
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response);
          this.instrukturList = response.data.data;
        })
        .catch((error) => {
          console.log(error);
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
        });
    },

    getStatusIzinText(status) {
      if (status == 1) {
        return "Dikonfirmasi";
      } else {
        return "Belum Dikonfirmasi";
      }
    },
  },
  computed: {
    formTitle() {
      return this.inputType;
    },
    getNamaInstruktur() {
      return (id_instruktur) => {
        const instruktur = this.instrukturList.find(
          (item) => item.id_instruktur === id_instruktur
        );
        return instruktur ? instruktur.nama_instruktur : "";
      };
    },
    getNamaInstrukturPengganti() {
      return (id_instruktur) => {
        const instruktur = this.instrukturList.find(
          (item) => item.id_instruktur_pengganti === id_instruktur
        );
        return instruktur ? instruktur.nama_instruktur : "";
      };
    },
  },
  mounted() {
    this.ReadData();
    this.ReadDataInstruktur();
  },
};
</script>

<template>
  <v-main class="IZN">
    <h3 class="text font-weight-medium mb-5">Data Izin Instruktur</h3>

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
        :items="izin_instrukturs"
        :search="search"
      >
        <template v-slot:item.id_instruktur="{ item }">
          {{ getNamaInstruktur(item.id_instruktur) }}
        </template>
        <template v-slot:item.id_instruktur_pengganti="{ item }">
          {{ getNamaInstruktur(item.id_instruktur_pengganti) }}
        </template>
        <template v-slot:item.status_izin="{ item }">
          {{ getStatusIzinText(item.status_izin) }}
        </template>
      </v-data-table>
    </v-card>
    <v-snackbar v-model="snackbar" :color="color" timeout="5000" top right>
      {{ error_message }}
    </v-snackbar>
  </v-main>
</template>
