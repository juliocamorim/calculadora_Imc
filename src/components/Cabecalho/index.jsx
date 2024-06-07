import styles from '../Cabecalho/Cabecalho.module.css'

const Cabecalho = () => {
    return (
        <header className={styles.header}>
            <h1 className={styles.title}>
                Calculadora de IMC
            </h1>
            <h3 className={styles.subtitle}>
                Descubra seu IMC em segundos e cuide melhor da sua saúde!
            </h3>
        </header>
    )
}
export default Cabecalho;