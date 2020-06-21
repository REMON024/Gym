using GYM.COMMON.Model.ViewModel;
using GYM.DAL;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
//using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace GYM.BLL
{
    public class GenerateRecepitConcrete : IGenerateRecepit
    {
        //private readonly IConfiguration _configuration;
        private readonly DatabaseContext _context;

        public GenerateRecepitConcrete(DatabaseContext context)
        {
            _context = context;
            //_configuration = configuration;

        }
        public GenerateRecepitViewModel Generate(int paymentId)
        {
            GenerateRecepitViewModel generateRecepitViewModel = new GenerateRecepitViewModel();
            generateRecepitViewModel= _context.PaymentDetails.Where(p => p.PaymentID == paymentId).Select(c => new GenerateRecepitViewModel() { 
            
            PaymentAmount=c.PaymentAmount.ToString(),
            PlanAmount=_context.PlanMaster.Where(p=>p.PlanID==c.PlanID).FirstOrDefault().PlanAmount.ToString(),
            ServicetaxAmount= _context.PlanMaster.Where(p => p.PlanID == c.PlanID).FirstOrDefault().ServicetaxAmount.ToString(),
            CreateDate=DateTime.Now.ToString(),
            MemberName=_context.MemberRegistration.Where(p=>p.MemberId==c.MemberID).FirstOrDefault().MemberFName,
            MemberNo=c.MemberNo,
            NextRenwalDate=c.NextRenwalDate.ToString(),
            PaymentFromdt=c.PaymentFromdt.ToString(),
            PaymentTodt=c.PaymentTodt.ToString(),
            PlanName= _context.PlanMaster.Where(p => p.PlanID == c.PlanID).FirstOrDefault().PlanName,
            SchemeName = _context.SchemeMaster.Where(p => p.SchemeID == _context.MemberRegistration.Where(d=>d.MemberId==c.MemberID).FirstOrDefault().SchemeID).FirstOrDefault().SchemeName

            }).FirstOrDefault();
            return generateRecepitViewModel;
        }
    }

    public interface IGenerateRecepit
    {
        GenerateRecepitViewModel Generate(int paymentId);
    }
}
