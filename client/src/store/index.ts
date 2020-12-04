import Vue from "vue";
import Vuex from "vuex";
import axios, { AxiosResponse } from "axios";
import {PublisherInterface} from '../types/types';
Vue.use(Vuex);


export default new Vuex.Store({
  state: {
    publishers: [],
    collections: [],
  },
  mutations: {
    setPublishers(state, payload) {
      state.publishers = payload;
    },
    setCollections(state, payload) {
      state.collections = payload;
    },
  },
  actions: {
    getPublishersAsync({ commit }) {
      axios
        .get("http://localhost:8000/publisher")
        .then((response: AxiosResponse) => {
          commit("setPublishers", response.data.publishers);
          
        });
    },
    getCollectionsAsync({ commit }) {
      return axios
        .get("http://localhost:8000/series")
        .then((response: AxiosResponse) => {
          commit("setCollections", response.data.series);
        });
    },
  },
  modules: {},
  getters: {
    getPublisherNames(state) {
      return state.publishers.map((publisher: any) => {
        return publisher.name;
      });
    },
    getPublisherIdByName: (state) => (name: string):void|number => {
      const publishers: PublisherInterface[] = state.publishers;
      for(const publisher of publishers){
        if(publisher.name === name){
          return publisher.id;
        }
      }
    },
    getCollections: (state)=>{
      return state.collections;
    },
    getSeriesById: (state) => (id: number) => {
      for(const collection of state.collections){
        //@ts-ignore
        if(collection.id === id){
          return collection
        }
      }
    },
    getIssueById: (state) => (seriesId: number, issueId: number) => {
      const collection: any = state.collections.filter((series: any) => {
        //console.log(series.id)
        if (series.id === seriesId) {
          return series;
        }
      })[0];

      return collection.issues.filter((issue: any) => {
        if (issue.id == issueId) {
          return issue;
        }
      })[0];
    },
    getCollectedIssues: (state) => (id: number) => {
      let count = 0;
      const collection: any = state.collections.filter((series: any) => {
        if (series.id === id) {
          return series;
        }
      })[0];
      for (let i = 0; i < collection.issues.length; i++) {
        if (collection.issues[i].is_collected === true) {
          count += 1;
        }
      }
      return count;
    },
  },
});
