import {useState} from 'react';
import {retornaCorDaNota} from '../../util';

export default function useSliderAvaliacao(){

    const [valorAudio, setValorAudio] = useState(5);
    const [valorFeedback, setValorFeedback] = useState(5);
    const [valorCores, setvalorCores] = useState(5);
    const [valorInterface, setValorInterface] = useState(5);

    function trocarCorAudio() {
        return retornaCorDaNota(valorAudio);
    }

    function trocarCorInterface() {
        return retornaCorDaNota(valorInterface);
    }

    function trocarCorFeedback() {
        return retornaCorDaNota(valorFeedback);
    }

    function trocarCorCores() {
        return retornaCorDaNota(valorCores);
    }

    function onChangeAudio(event: Event, value: number | number[]) {
        setValorAudio(value as number);
    }

    function onChangeInterface(event: Event, value: number | number[]) {
        setValorInterface(value as number);
    }

    function onChangeFeedback(event: Event, value: number | number[]) {
        setValorFeedback(value as number);
    }

    function onChangeCores(event: Event, value: number | number[]) {
        setvalorCores(value as number);
    }

    return{
        trocarCorAudio,
        trocarCorInterface,
        trocarCorFeedback,
        trocarCorCores,
        onChangeAudio,
        onChangeInterface,
        onChangeFeedback,
        onChangeCores,
        valorAudio,
        valorFeedback,
        valorCores,
        valorInterface,
        setValorAudio,
        setValorInterface,
        setValorFeedback,
        setvalorCores,
    }

}