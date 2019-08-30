#!/usr/bin/env node
const axios = require("axios");
const country = require("country-list");
const prompts = require("prompts");
const clear = require("clear");
const api = "https://date.nager.at/api/v2/publicholidays/";


const questions = [
        {
                type: "text",
                name: "pays",
                message: "Quel est votre pays ?"
        },
        {
                type: "number",
                name: "année",
                message: "De quelle année souhaitez vous porter votre recherche ?"
        }
];

let Conges = async () => {
        const response = await prompts(questions);

        let pays = response.pays;
        let annee = response.année;

        if (annee == "") {
                annee = new Date().getFullYear();
        }
        let codepay = country.getCode(pays);
        console.log(annee);
        console.log(pays);

        const apiResult = await axios.get(api +"/"+annee+"/"+codepay ) ;
        let fête = Array.from(apiResult.data);
        fête.forEach(res => {
                console.log(`${res.date} : ${res.name}.`);
        });


};

clear();
Conges();