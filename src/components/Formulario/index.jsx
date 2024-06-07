import { useEffect, useState } from "react";

import styles from './Formulario.module.css';

// Função para calcular o IMC 
function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}

// Função para definirmos o resultado baseado no IMC

function msgTexto(IMC) {
    if (IMC < 17) {
        return "Muito abaixo do peso";
    } else if (IMC < 18.49) {
        return "Abaixo do peso";
    } else if (IMC < 24.99) {
    return "Peso normal";
    } else if (IMC < 29.99) {
        return "Acima do peso";
    } else {
        return "Obesidade"; 
    } 
}

//definindo os componentes
const Formulario = () => { 
    const [peso, setPeso] = useState("");
    const [altura, setAltura] = useState("") ;
    const [imcData, setIMCData] = useState(null);

    useEffect(() => {
        if (imcData) {
            console.log("IMCData mudou:", imcData);
        }
    },[imcData]);

//manipulação das mudanças de peso e altura
const handleChange = (setter) => (e) => {
    const valor = e.target.value;
    setter(valor >= 0 ? valor : "");
    };

const resultadoIMC = () => {
    try {
        const pesoFloat = parseFloat(peso.replace(",", "."));
        const alturaFloat = parseFloat(altura.replace(",", ".")) / 100;

        if (isNaN(pesoFloat) || isNaN(alturaFloat) || pesoFloat < 2 || pesoFloat > 500 || alturaFloat < 0.5 || alturaFloat > 2.5) {
            throw new Error("Preencha os campos com números válidos: peso entre 2Kg e 500Kg e altura entre 50cm e 2,5m.");
        }

        const imc = calcularIMC(pesoFloat, alturaFloat).toFixed(2);
        const imcResultText = msgTexto(parseFloat(imc));

    setIMCData({
        peso: pesoFloat,
        altura: alturaFloat,
        IMC: parseFloat(imc),
        result: imcResultText,
    });

        setPeso("");
        setAltura("");
    } catch (error) {
        alert(error.message);
        setPeso("");
        setAltura("");
    }
};

const handleSubmit = (e) => {
    e.preventDefault();
    resultadoIMC();
};

return (
    <>
        <form className={styles.formulario} onSubmit={handleSubmit}>
            <div>
                <div className={styles.campo}>
                    <label htmlFor="peso">Peso</label>
                    <input className={styles.input} type="number" id="peso" value={peso} onChange={handleChange(setPeso)} />
                </div>
                <div className={styles.campo}>
                    <label htmlFor="altura">Altura</label>
                    <input className={styles.input} type="number" id="altura" value={altura} onChange={handleChange(setAltura)} />
                </div>
            </div>
            <button className={styles.botao} type="submit">Calcular o IMC</button>
        {imcData && (
            <div className="formulario-resultado">
                <p>Seu IMC é {imcData.IMC}, o que indica que você está {imcData.result}</p>
            </div>
        
        )}
        </form>
    </>
    );
};

export default Formulario;