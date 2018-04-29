<template>
  <div class="card-container">
    <div class="card">
      <div class="card-header">
        <div class="card-title h5" v-text="route.name"/>
        <div class="card-subtitle text-gray" v-text="lengthRepresentation" />
      </div>
      <div class="card-body">
        <table class="table table-striped table-hover">
          <tbody>
            <tr>
              <td>Average Gradient</td>
              <td v-text="gradientRepresentation" />
            </tr>
            <tr>
              <td>Altitude Gain</td>
              <td v-text="gainRepresentation" />
            </tr>
            <tr>
              <td>Pre '79 Classification</td>
              <td v-text="pre79Representation" />
            </tr>
            <tr>
              <td>Post '79 Classification</td>
              <td v-text="post79Representation" />
            </tr>
          </tbody>
        </table>
      </div>
      <div class="card-footer">
        <button class="btn" @click="$emit('closeOverlay')">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InfoOverlay',
  props: {
    route: Object
  },
  computed: {
    lengthRepresentation() {
      const length = this.route.length || 'Unknown'
      return `Length: ${length} km`
    },
    gainRepresentation() {
      return this.route.gain ?
        `${this.route.gain} m` : 'Unknown'
    },
    gradientRepresentation() {
      return this.route.gradient ?
        `${this.route.gradient} %` : 'Unknown'
    },
    pre79Representation() {
      return this.route.pre79HighestClassification ?
        `${this.route.pre79HighestClassification}` : 'Unknown'
    },
    post79Representation() {
      return this.route.post79HighestClassification ?
        `${this.route.post79HighestClassification}` : 'Unknown'
    },
  }
}
</script>

<style>
@media (max-width: 568px) {
  .card-container {
    position: fixed;
    top: 3em;
    left: 10%;
    width: 80%;
  }
}

@media (min-width: 568px) {
  .card-container {
    position: fixed;
    top: 3em;
    left: 3em;
  }
}

.card-footer {
  text-align: right;
}
</style>
