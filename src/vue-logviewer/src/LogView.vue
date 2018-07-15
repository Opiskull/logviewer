<template>
<div>
    <v-toolbar app fixed>
      <v-toolbar-title  class="hidden-sm-and-down"><span>LogViewer</span></v-toolbar-title>
      <v-spacer class="hidden-sm-and-down"></v-spacer>
      <v-text-field v-model="search" hide-details prepend-inner-icon="search" label="Search" solo></v-text-field>
      <v-btn icon v-on:click="addItem"><v-icon>plus</v-icon></v-btn>
    </v-toolbar>
    <v-content>
  <v-container>
    <v-data-table 
    :rows-per-page-items="[100,500,1000]" 
    :items="items" hide-headers 
    :custom-filter="customFilter" 
    :search="search"
    :pagination.sync="pagination" hide-actions>
      <template slot="items" slot-scope="props">
        <td>{{props.item}}</td>
      </template>
    </v-data-table>
    
  </v-container>
    </v-content>
<v-footer app fixed >
      <v-toolbar>
<v-pagination v-model="pagination.page" :length="pages"></v-pagination>
<v-toolbar-title>TotalItems: {{totalItems}}</v-toolbar-title>
      </v-toolbar>
    </v-footer>
  </div>
  
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";


interface LogEntry {
  text: string;
}

@Component
export default class LogView extends Vue {
  public get items() {
    return this.$store.state.entries;
  }

  public customFilter(items: string[], search: string, filter: any) {
    return items.filter(row =>
      row.toLowerCase().includes(search.toLowerCase())
    );
  }
  public search: string = "";

  public pagination: any = {};

  public get totalItems(){
    return this.$store.state.entries.length;
  }

  public get pages() {
    if (
      this.pagination.rowsPerPage == null ||
      this.pagination.totalItems == null
    )
      return 0;

    return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage);
  }

  public addItem(){
    this.$store.commit("addLog","test Message" + this.$store.state.entries.length);
  }
}
</script>

<style>
</style>
