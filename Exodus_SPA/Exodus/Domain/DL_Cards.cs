using Exodus.Enums;
using Exodus.ViewModels;
using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Web;

namespace Exodus.Domain
{
    public static partial class _DL
    {
        public static class Cards
        {
            public static class Get
            {
                public static VM_BankCard ByID(int CardID)
                {
                    using (var exodusDB = new exodusEntities())
                    {
                        var cd = exodusDB.stp_GetCreditCardByID(CardID).FirstOrDefault();
                        if(cd != null)
                        {
                            return new VM_BankCard()
                            {
                                CardID = cd.CreditCardID,
                                AdditionalInfo = cd.CardAdditionalInfo,
                                BankID = cd.fk_BankID,
                                BankName = cd.BankName,
                                CardNumber = cd.CardNumber,
                                CardValidTill = cd.CardValidTill,
                                TypeID = (EN_CardType)cd.fk_CardTypeID,
                                UserID = cd.fk_UserID
                            };
                        }
                    }
                    return null;
                }

                public static List<VM_BankCard> ByUserID(long UserID)
                {
                    using (var exodusDB = new exodusEntities())
                    {
                        var cards = exodusDB.stp_CreditCards_ByUserID(UserID).ToList();
                        if (cards.Count > 0)
                        {
                            return cards.Select(a => new VM_BankCard()
                            {
                                BankName = a.BankName,
                                CardID = a.CreditCardID,
                                UserID = a.UserID,
                                TypeID = (EN_CardType)a.CreditCardTypeID,
                                BankID = a.BankID,
                                CardNumber = a.CardNumber,
                                CardValidTill = a.CardValidTill,
                                AdditionalInfo = a.CardAdditionalInfo,
                            }).ToList();
                        }
                    }
                    return new List<VM_BankCard>();
                }

                public static List<VM_BankCardType> CreditCardType()
                {
                    using (var exodusDB = new exodusEntities())
                    {
                        return exodusDB.stp_CreditCardTypes().Select(a => new VM_BankCardType()
                        {
                            CardTypeID = (EN_CardType)a.CreditCardTypeID,
                            CardTypeName = a.CreditCardTypeName
                        }).ToList();
                    }
                }
            }

            public static class Update
            {
                public static int UpdateCard(VM_BankCard card)
                {
                    using (var exodusDB = new exodusEntities())
                    {
                        var Result = new ObjectParameter("Result", 0);

                        exodusDB.stp_CreditCard_Update(
                            creditCardID: card.CardID,
                            cardTypeID: (long)card.TypeID,
                            bankID: card.BankID,
                            cardNumber: card.CardNumber,
                            cardValidTill: card.CardValidTill,
                            cardAdditionalInfo: card.AdditionalInfo,
                            result: Result
                            );

                        return Convert.ToInt32(Result.Value);
                    }
                }
            }

            public static class Add
            {
                public static long AddCard(VM_BankCard card)
                {
                    using (var exodusDB = new exodusEntities())
                    {
                        var Result = new ObjectParameter("Result", 0);
                        //
                        var cardID = exodusDB.stp_CreditCard_Add(
                            userID: card.UserID,
                            cardTypeID: (long)card.TypeID,
                            bankID: card.BankID,
                            cardNumber: card.CardNumber,
                            cardValidTill: card.CardValidTill,
                            cardAdditionalInfo: card.AdditionalInfo,
                            result: Result
                            );
                        return Convert.ToInt64(Result.Value) == 0 ? cardID : -1;
                    }
                }
            }

            public static class Delete
            {
                public static int DeleteCard(long CreditCardID)
                {
                    using (var exodusDB = new exodusEntities())
                    {
                        var Result = new ObjectParameter("Result", 0);
                        exodusDB.stp_CreditCard_Delete(
                            creditCardID: CreditCardID,
                            result: Result);

                        return Convert.ToInt32(Result.Value);
                    }
                }
            }
        }
    }
}