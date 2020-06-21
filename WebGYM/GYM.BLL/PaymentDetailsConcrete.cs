using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using System.Linq.Dynamic.Core;
using GYM.DAL;
using GYM.COMMON.Model.DTO;
using GYM.COMMON.Model.ViewModel;
using GYM.COMMON.Library;
namespace GYM.BLL
{
    public class PaymentDetailsConcrete : IPaymentDetails
    {
       
        private readonly DatabaseContext _context;

        public PaymentDetailsConcrete(DatabaseContext context)
        {
            _context = context;
           

        }
        public IQueryable<PaymentDetailsViewModel> GetAll(QueryParameters queryParameters, int userId)
        {
            IQueryable<PaymentDetailsViewModel> allItems = (from payment in _context.PaymentDetails
                                                            where payment.Createdby == userId
                                                            join member in _context.MemberRegistration on payment.MemberID equals member.MemberId
                                                            join plan in _context.PlanMaster on payment.PlanID equals plan.PlanID
                                                            join scheme in _context.SchemeMaster on payment.WorkouttypeID equals scheme.SchemeID
                                                            select new PaymentDetailsViewModel()
                                                            {
                                                                RecStatus = payment.RecStatus,
                                                                PlanName = plan.PlanName,
                                                                MemberName = member.MemberFName + '|' + member.MemberMName + '|' + member.MemberLName,
                                                                MemberNo = member.MemberNo,
                                                                NextRenwalDate = payment.NextRenwalDate,
                                                                PaymentAmount = payment.PaymentAmount,
                                                                SchemeName = scheme.SchemeName,
                                                                PaymentID = payment.PaymentID,
                                                                PaymentFromdt = payment.PaymentFromdt,
                                                                PaymentTodt = payment.PaymentTodt

                                                            }).AsQueryable().OrderBy("PaymentID", queryParameters.IsDescending());

            if (queryParameters.HasQuery())
            {
                allItems = allItems
                    .Where(x => x.MemberName.ToLowerInvariant().Contains(queryParameters.Query.ToLowerInvariant()));
            }

            return allItems
                .Skip(queryParameters.PageCount * (queryParameters.Page - 1))
                .Take(queryParameters.PageCount);
        }

        public int Count(int userId)
        {
            var paycount = (from payment in _context.PaymentDetails
                            where payment.Createdby == userId
                            select payment).Count();
            return paycount;
        }

        public bool RenewalPayment(RenewalViewModel renewalViewModel)
        {

            var result = new PaymentDetails() { 
            PaymentAmount=_context.PaymentDetails.Where(p=>p.PaymentID==renewalViewModel.PaymentID).FirstOrDefault().PaymentAmount,
            MemberID=renewalViewModel.MemberId,
            MemberNo=renewalViewModel.MemberNo,
            PaymentFromdt=renewalViewModel.NewDate,
            
            
            
            };
            int time = Convert.ToInt32(_context.PeriodTb.Where(p => p.PeriodID == (_context.PlanMaster.Where(c => c.PlanID == renewalViewModel.PlanID).FirstOrDefault().PeriodID)).FirstOrDefault().Value.ToString());

            result.PaymentTodt = renewalViewModel.NewDate.AddMonths(time);
            result.NextRenwalDate = renewalViewModel.NewDate.AddMonths(time).AddDays(1);

            var res = _context.PaymentDetails.Add(result).Entity;
            _context.SaveChanges();
            if (res.PaymentID > 0)
            {
                return true;
            }
            return false;
            
        }






    }

    public interface IPaymentDetails
    {
        IQueryable<PaymentDetailsViewModel> GetAll(QueryParameters queryParameters, int userId);
        int Count(int userId);
        bool RenewalPayment(RenewalViewModel renewalViewModel);
    }
}
