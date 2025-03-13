using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Mission10.Data;

namespace Mission10.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BowlersController : ControllerBase
    {
        private BowlingLeagueContext _context;

        public BowlersController(BowlingLeagueContext temp)
        {
            _context = temp;
        }

        [HttpGet]
        public IEnumerable<object> Get()
        {
            var bowlerList = _context.Bowlers
                .Where(b => b.Team != null && (b.Team.TeamName == "Marlins" || b.Team.TeamName == "Sharks"))
                .Select(b => new
                {
                    b.BowlerFirstName,
                    b.BowlerLastName,
                    b.BowlerMiddleInit,
                    b.BowlerAddress,
                    b.BowlerCity,
                    b.BowlerState,
                    b.BowlerZip,
                    b.BowlerPhoneNumber,
                    TeamName = b.Team.TeamName
                })
                .ToList();

            return bowlerList;
        }

    }
}
