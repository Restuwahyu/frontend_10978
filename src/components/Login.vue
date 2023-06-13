<!-- FONT -->
<head>
  <link href="https://fonts.googleapis.com/css?family=Poppins&display=swap" rel="stylesheet">
</head>

<template>
  <main>
    <v-container fluid fill-height class="container" back>
      <v-layout flex align-center justify-center>
        <v-card
          style="
            padding: 30px 40px 10px 0px;
            border-radius: 20px;
            border: transparent;
          "
          elevation="10"
        >
          <div class="flexbox">
            <div class="logo">
              <img
                src="../assets/logo_gym.png"
                alt="logo"
                height="300px"
                class="center"
              />
            </div>
            <v-divider class="mx-2" vertical></v-divider>
            <div class="textLogin">
              <h2 style="font-family: 'Poppins', sans-serif; font-weight: 600">
                LOGIN GO FIT GYM
              </h2>
              <br />
              <v-form v-model="valid" ref="form">
                <v-text-field
                  label="E-mail/ID"
                  v-model="username"
                  :rules="usernameRules"
                  required
                  outlined
                ></v-text-field>
                <v-text-field
                  label="Password"
                  v-model="password"
                  type="password"
                  :rules="passwordRules"
                  required
                  outlined
                >
                </v-text-field>
                <v-layout justify-center>
                  <v-btn
                    class="mr-2"
                    @click="submit"
                    :class="{
                      'blue darken-1 white--text': valid,
                      disabled: !valid,
                    }"
                    >Login
                  </v-btn>
                </v-layout>
              </v-form>
            </div>
          </div>
        </v-card>
      </v-layout>
      <v-snackbar v-model="snackbar" :color="color" timeout="5000" top right>
        {{ error_message }}
      </v-snackbar>
    </v-container>
  </main>
</template>

<script>
/* eslint-disable */
export default {
  name: "Login",
  data() {
    return {
      load: false,
      snackbar: false,
      valid: false,
      error_message: "",
      color: "",
      password: "",
      passwordRules: [(v) => !!v || "Password tidak boleh kosong!"],
      username: "",
      usernameRules: [(v) => !!v || "E-mail/ID tidak boleh kosong!"],
    };
  },
  methods: {
    submit() {
      let url = this.$api + "/login";
      this.$http
        .post(url, {
          username: this.username,
          password: this.password,
        })
        .then((response) => {
          console.log(response);
          if (response.data.data.id_pegawai != null) {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("id_pegawai", response.data.data.id_pegawai);
            localStorage.setItem(
              "email_pegawai",
              response.data.data.email_pegawai
            );
            localStorage.setItem(
              "nama_pegawai",
              response.data.data.nama_pegawai
            );
            localStorage.setItem("role", response.data.data.role_pegawai);

            if (response.data.data.role_pegawai == "Admin") {
              this.$router.push("/dashboardadmin");
            } else if (response.data.data.role_pegawai == "MO") {
              this.$router.push("/dashboardmo");
            } else if (response.data.data.role_pegawai == "Kasir") {
              this.$router.push("/dashboardkasir");
            }

            this.error_message = response.data.message;
            this.color = "blue";
            this.snackbar = true;
            this.load = false;
          }
        })
        .catch((error) => {
          console.log(error);
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          localStorage.removeItem("token");
          this.load = false;
        });
    },
  },
};
</script>

<style scoped>
.container {
  position: absolute;
  left: 0px;
  right: 0px;
  font-family: "Poppins", sans-serif;
  background-image: url("../assets/bg.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}

.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 15px;
}
</style>

<style scoped>
.flexbox {
  display: flex;
  flex-direction: row;
  font-family: "Montserrat", sans-serif;
  width: 50vw;
}
.logo {
  flex: 30%;
  padding: 1rem;
}

.textLogin {
  top: 50%;
  left: 50%;
  transform: translate(0%, 10%);
  flex: 70%;
  padding: 1rem;
}
</style>
