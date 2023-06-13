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
            Berhasil Login Sebagai Admin!
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
        {
          title: "Member Aktif",
          amount: "",
          icon: "mdi-account-group-outline",
          color: "blue darken-1",
        },
        {
          title: "Member Tidak Aktif",
          amount: "",
          icon: "mdi-account-group-outline",
          color: "blue darken-1",
        },
        {
          title: "Transaksi Aktivasi",
          amount: "",
          icon: "mdi-account-group-outline",
          color: "blue darken-1",
        },
        {
          title: "Transaksi Deposit Uang",
          amount: "",
          icon: "mdi-account-group-outline",
          color: "blue darken-1",
        },
        {
          title: "Transaksi Deposit Kelas",
          amount: "",
          icon: "mdi-account-group-outline",
          color: "blue darken-1",
        },
        {
          title: "Transaksi Deposit Kadaluarsa",
          amount: "",
          icon: "mdi-account-group-outline",
          color: "blue darken-1",
        },
        {
          title: "Presensi Gym",
          amount: "",
          icon: "mdi-account-group-outline",
          color: "blue darken-1",
        },
        {
          title: "Presensi Kelas",
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

    //Menampilkan jumlah member aktif
    this.$http
      .get(this.$api + "/member")
      .then((response) => {
        this.members = response.data.data;
        this.activityLog[5].amount = this.members.length;
      })
      .catch((error) => {
        console.log(error);
      });

    //Menampilkan jumlah member tidak aktif
    this.$http
      .get(this.$api + "/members")
      .then((response) => {
        this.members = response.data.data;
        this.activityLog[6].amount = this.members.length;
      })
      .catch((error) => {
        console.log(error);
      });

    //Menampilkan jumlah transaksi aktivasi
    this.$http
      .get(this.$api + "/transaksi_aktivasi")
      .then((response) => {
        this.members = response.data.data;
        this.activityLog[7].amount = this.members.length;
      })
      .catch((error) => {
        console.log(error);
      });

    //Menampilkan jumlah transaksi deposit uang
    this.$http
      .get(this.$api + "/transaksi_deposit_uang")
      .then((response) => {
        this.members = response.data.data;
        this.activityLog[8].amount = this.members.length;
      })
      .catch((error) => {
        console.log(error);
      });

    //Menampilkan jumlah transaksi deposit kelas
    this.$http
      .get(this.$api + "/transaksi_deposit_kelas")
      .then((response) => {
        this.members = response.data.data;
        this.activityLog[9].amount = this.members.length;
      })
      .catch((error) => {
        console.log(error);
      });

    //Menampilkan jumlah transaksi deposit kadaluarsa
    this.$http
      .get(this.$api + "/transaksi_deposit_kelass")
      .then((response) => {
        this.members = response.data.data;
        this.activityLog[10].amount = this.members.length;
      })
      .catch((error) => {
        console.log(error);
      });

    //Menampilkan jumlah presensi gym
    this.$http
      .get(this.$api + "/booking_gym")
      .then((response) => {
        this.members = response.data.data;
        this.activityLog[11].amount = this.members.length;
      })
      .catch((error) => {
        console.log(error);
      });

    //Menampilkan jumlah presensi kelas
    this.$http
      .get(this.$api + "/booking_kelas")
      .then((response) => {
        this.members = response.data.data;
        this.activityLog[12].amount = this.members.length;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style scoped></style>
