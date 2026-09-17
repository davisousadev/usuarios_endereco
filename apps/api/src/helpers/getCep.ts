export async function getCEP(cep: string) {
  try {
    const responseCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const dataCEP = await responseCEP.json();

    return dataCEP;
  } catch (error) {
    return { error: "Erro ao buscar CEP" };
  }
}
