using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GYM.DAL;
using GYM.COMMON.Model.DTO;

namespace GYM.BLL
{
    public class PeriodMasterConcrete : IPeriodMaster
    {
        private readonly DatabaseContext _databaseContext;
        public PeriodMasterConcrete(DatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
        }

        public List<PeriodTB> ListofPeriod()
        {
            var listofPeriod = _databaseContext.PeriodTb.ToList();

            listofPeriod.IndexOf(new PeriodTB()
            {
                Text = "---Select---",
                Value = string.Empty
            },0);

            return listofPeriod;
        }
    }

    public interface IPeriodMaster
    {
        List<PeriodTB> ListofPeriod();
    }
}
