using HemofluxoAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace HemofluxoAPI.Controllers;

[ApiController]
[Route("api/locais")]
public class LocaisController : ControllerBase
{
    private static readonly List<LocalDoacao> locais = new()
    {
        new LocalDoacao
        //testes
        {
            
            Id = 1,
            Nome = "Núcleo de Hemoterapia",
            Endereco = "Rua Wenceslau Braz, 05 - Vila Euclides, 19014-030",
            Cidade = "Presidente Prudente",
            Estado = "SP",
            Telefone = "(18) 3223-3511"
            },
        new LocalDoacao
        {
            Id = 2,
            Nome = "Instituto Rh Hematologia e Hemoterapia",
            Endereco = "Av. Coronel José Soares Marcondes, 2063 - Uep1-S.1, 19013-050",
            Cidade = "Presidente Prudente",
            Estado = "SP",
            Telefone = "(18) 3226-1555"
            },
        new LocalDoacao
        {
            Id = 3,
            Nome = "Banco de Sangue do Hospital Regional (HR)",
            Endereco = "Rua José Bongiovani, 1.297 – Vila Liberdade, 19014-030",
            Cidade = "Presidente Prudente",
            Estado = "SP",
            Telefone = "(18) 3229-1500"
        },
        new LocalDoacao
        {
             Id = 4,
             Nome = "Banco de Sangue Vida",
             Endereco = "Avenida Brasil, 450",
             Cidade = "Santos",
             Estado = "SP",
             Telefone = "(13) 0000-0003"
             },
        new LocalDoacao
        {
            Id = 5,
            Nome = "Centro de Doação Esperança",
            Endereco = "Rua da Saúde, 120",
            Cidade = "Sorocaba",
            Estado = "SP",
            Telefone = "(15) 0000-0004"
            },
        new LocalDoacao
        {
            Id = 6,
            Nome = "Hemocentro Regional de Teste",
            Endereco = "Avenida Central, 780",
            Cidade = "Ribeirão Preto",
            Estado = "SP",
            Telefone = "(16) 0000-0005"
        },
        new LocalDoacao
        {
            Id = 7,
            Nome = "Banco de Sangue Solidário",
            Endereco = "Rua da Paz, 90",
            Cidade = "São José dos Campos",
            Estado = "SP",
            Telefone = "(12) 0000-0006"
        },
        new LocalDoacao
        {
             Id = 8,
             Nome = "Centro Hemoterápico de Teste",
             Endereco = "Rua das Palmeiras, 250",
             Cidade = "Jundiaí",
             Estado = "SP",
             Telefone = "(11) 0000-0007"
        },
        new LocalDoacao
        {
            Id = 9,
            Nome = "Hemocentro Vida Nova",
            Endereco = "Avenida Independência, 600",
            Cidade = "Bauru",
            Estado = "SP",
            Telefone = "(14) 0000-0008"
            },
        new LocalDoacao
        {
            Id = 10,
            Nome = "Banco de Sangue do Interior",
            Endereco = "Rua São João, 175",
            Cidade = "Piracicaba",
            Estado = "SP",
            Telefone = "(19) 0000-0009"
        }
        
        
    };

    [HttpGet]
    public ActionResult<List<LocalDoacao>> ObterTodos()
    {
        return Ok(locais);
    }

    [HttpGet("{id}")]
    public ActionResult<LocalDoacao> ObterPorId(int id)
    {
        var local = locais.FirstOrDefault(l => l.Id == id);

        if (local == null)
        {
            return NotFound(new
            {
                mensagem = "Local de doação não encontrado."
            });
        }

        return Ok(local);
    }
}