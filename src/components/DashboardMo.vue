<template>
  <v-main>
    <div class="dashboard">
      <v-subheader class="py-0 d-flex justify-space-between rounded-lg">
        <h3>Dashboard</h3>
      </v-subheader>
      <br />
      <v-row>
        <v-col>
          <v-alert dense text type="success">
            Berhasil Login Sebagai MO!
          </v-alert>
          <v-row>
            <v-col v-for="(item, index) in activityLog" :key="index">
              <v-card elevation="2" class="rounded-lg">
                <v-card-text class="d-flex justify-space-between align-center">
                  <div>
                    <strong>{{ item.title }}</strong> <br />
                    <span>Banyak Data Berdasarkan Data Terakhir</span>
                  </div>
                  <v-avatar
                    size="60"
                    :color="item.color"
                    style="border: 3px solid #444"
                  >
                    <span style="color: white">{{ item.amount }}</span>
                  </v-avatar>
                </v-card-text>
                <v-card-actions class="d-flex justify-space-between">
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
  </v-main>
</template>

<script>
/* eslint-disable */
export default {
  name: "Dashboard",
  data() {
    return {
      instrukturs: [],
      activityLog: [
        {
          title: "Instruktur",
          amount: "",
          icon: "mdi-account-group-outline",
          color: "blue darken-1",
        },
        {
          title: "Jadwal Reguler",
          amount: "",
          icon: "mdi-account-group-outline",
          color: "blue darken-1",
        },
        {
          title: "Jadwal Harian",
          amount: "",
          icon: "mdi-account-group-outline",
          color: "blue darken-1",
        },
        {
          title: "Izin Intruktur",
          amount: "",
          icon: "mdi-account-group-outline",
          color: "blue darken-1",
        },
        {
          title: "Izin Instruktur Terkonfirmasi",
          amount: "",
          icon: "mdi-account-group-outline",
          color: "blue darken-1",
        },
      ],
    };
  },
  methods: {
    onButtonClick(item) {
      console.log("click on " + item.no);
    },
  },
  mounted() {
    //Menampilkan jumlah instruktur
    this.$http
      .get(this.$api + "/instruktur")
      .then((response) => {
        this.instrukturs = response.data.data;
        this.activityLog[0].amount = this.instrukturs.length;
      })
      .catch((error) => {
        console.log(error);
      });

    //Menampilkan jumlah jadwal umum
    this.$http
      .get(this.$api + "/jadwal_umum")
      .then((response) => {
        this.instrukturs = response.data.data;
        this.activityLog[1].amount = this.instrukturs.length;
      })
      .catch((error) => {
        console.log(error);
      });

    //Menampilkan jumlah jadwal harian
    this.$http
      .get(this.$api + "/jadwal_harian")
      .then((response) => {
        this.instrukturs = response.data.data;
        this.activityLog[2].amount = this.instrukturs.length;
      })
      .catch((error) => {
        console.log(error);
      });

    //Menampilkan jumlah izin instruktur yang belum dikonfirmasi
    this.$http
      .get(this.$api + "/izin_instrukturs")
      .then((response) => {
        this.izin_instrukturs = response.data.data;
        this.activityLog[3].amount = this.izin_instrukturs.length;
      })
      .catch((error) => {
        console.log(error);
      });

    //Menampilkan jumlah izin instruktur yang telah terkonfirmasi
    this.$http
      .get(this.$api + "/izin_instruktur")
      .then((response) => {
        this.izin_instrukturs = response.data.data;
        this.activityLog[4].amount = this.izin_instrukturs.length;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style scoped></style>
