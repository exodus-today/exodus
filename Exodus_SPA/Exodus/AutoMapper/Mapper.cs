using AutoMapper;
using Exodus.DTO;
using Exodus.DTO_Api;
using Exodus.Models.Search;
using Exodus.ViewModels;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;

namespace Exodus.Mapper
{
    public static partial class Mapper
    {
        public static void Init()
        {
            AutoMapper.Mapper.Initialize(cfg =>
                {
                    cfg.AddProfiles(new[] { typeof(Domain._DL.Intention) });
                    IntentionMap(cfg); // Create Intention Map
                    ObligationMap(cfg); // Create Obligation Map
                    TagMap(cfg); // Create Tag Map
                    UserMap(cfg); // Create User Map
                }
            );
        }

        public static void UserMap(IMapperConfigurationExpression cfg)
        {
            cfg.CreateMap<VM_User, DTO_User_LightModel>();
        }

        public static void TagMap(IMapperConfigurationExpression cfg)
        {
            cfg.CreateMap<VM_Tag, TagSearch>();
        }

        public static void ObligationMap(IMapperConfigurationExpression cfg)
        {
            cfg.CreateMap<VM_Obligation, ObligationDTO>()
                // Application
                .ForMember(m => m.ApplicationID, o => o.MapFrom(f => f.ObligationApplication.ApplicationID))
                .ForMember(m => m.ApplicationNameEng, o => o.MapFrom(f => f.ObligationApplication.ApplicationNameEng))
                .ForMember(m => m.ApplicationNameRus, o => o.MapFrom(f => f.ObligationApplication.ApplicationNameRus))
                // Tag
                .ForMember(m => m.TagID, o => o.MapFrom(f => f.ObligationTag.TagID))
                .ForMember(m => m.TagNameEng, o => o.MapFrom(f => f.ObligationTag.NameEng))
                .ForMember(m => m.TagNameRus, o => o.MapFrom(f => f.ObligationTag.NameRus))
                .ForMember(m => m.TagDescription, o => o.MapFrom(f => f.ObligationTag.Description))
                // ObligationKind
                .ForMember(m => m.ObligationKindID, o => o.MapFrom(f => f.ObligationKind.ObligationKindID))
                .ForMember(m => m.ObligationKindNameEng, o => o.MapFrom(f => f.ObligationKind.ObligationNameEng))
                .ForMember(m => m.ObligationKindNameRus, o => o.MapFrom(f => f.ObligationKind.ObligationNameRus))
                // ObligationType
                .ForMember(m => m.ObligationTypeID, o => o.MapFrom(f => f.ObligationType.ObligationTypeID))
                .ForMember(m => m.ObligationTypeNameEng, o => o.MapFrom(f => f.ObligationType.ObligationTypeNameEng))
                .ForMember(m => m.ObligationTypeNameRus, o => o.MapFrom(f => f.ObligationType.ObligationTypeNameRus))
                // Holder
                .ForMember(m => m.ObligationHolderID, o => o.MapFrom(f => f.ObligationHolder.UserID))
                .ForMember(m => m.ObligationHolderFirstName, o => o.MapFrom(f => f.ObligationHolder.UserFirstName))
                .ForMember(m => m.ObligationHolderLastName, o => o.MapFrom(f => f.ObligationHolder.UserLastName))
                 .ForMember(m => m.ObligationHolderAvatarSmall, o => o.MapFrom(f => f.ObligationHolder.AvatarSmall))
                //Issuer
                .ForMember(m => m.ObligationIssuerID, o => o.MapFrom(f => f.ObligationIssuer.UserID))
                .ForMember(m => m.ObligationIssuerFirstName, o => o.MapFrom(f => f.ObligationIssuer.UserFirstName))
                .ForMember(m => m.ObligationIssuerLastName, o => o.MapFrom(f => f.ObligationIssuer.UserLastName))
                .ForMember(m => m.ObligationIssuerAvatarSmall, o => o.MapFrom(f => f.ObligationIssuer.AvatarSmall))
                // ObligationClass
                .ForMember(m => m.ObligationClass, o => o.MapFrom(f => f.ObligationClass.ObligationClass))
                .ForMember(m => m.ObligationClassComment, o => o.MapFrom(f => f.ObligationClass.ObligationClassComment))
                .ForMember(m => m.ObligationClassNameEng, o => o.MapFrom(f => f.ObligationClass.ObligationClassNameEng))
                .ForMember(m => m.ObligationClassNameRus, o => o.MapFrom(f => f.ObligationClass.ObligationClassNameRus))
                 // ObligationStatus
                 .ForMember(m => m.ObligationStatus, o => o.MapFrom(f => f.ObligationStatus.ObligationStatus))
                .ForMember(m => m.ObligationStatusComment, o => o.MapFrom(f => f.ObligationStatus.ObligationStatusComment))
                .ForMember(m => m.ObligationStatusNameEng, o => o.MapFrom(f => f.ObligationStatus.ObligationStatusNameEng))
                .ForMember(m => m.ObligationStatusNameRus, o => o.MapFrom(f => f.ObligationStatus.ObligationStatusNameRus));
        }

        public static void IntentionMap(IMapperConfigurationExpression cfg)
        {
            cfg.CreateMap<VM_Intention, IntentionDTO>()
                // Application
                .ForMember(m => m.ApplicationID, o => o.MapFrom(f => f.IntentionApplication.ApplicationID))
                .ForMember(m => m.ApplicationNameEng, o => o.MapFrom(f => f.IntentionApplication.ApplicationNameEng))
                .ForMember(m => m.ApplicationNameRus, o => o.MapFrom(f => f.IntentionApplication.ApplicationNameRus))
                // Tag
                .ForMember(m => m.TagID, o => o.MapFrom(f => f.IntentionTag.TagID))
                .ForMember(m => m.TagNameEng, o => o.MapFrom(f => f.IntentionTag.NameEng))
                .ForMember(m => m.TagNameRus, o => o.MapFrom(f => f.IntentionTag.NameRus))
                .ForMember(m => m.TagDescription, o => o.MapFrom(f => f.IntentionTag.Description))
                // ObligationKind
                .ForMember(m => m.ObligationKindID, o => o.MapFrom(f => f.ObligationKind.ObligationKindID))
                .ForMember(m => m.ObligationKindNameEng, o => o.MapFrom(f => f.ObligationKind.ObligationNameEng))
                .ForMember(m => m.ObligationKindNameRus, o => o.MapFrom(f => f.ObligationKind.ObligationNameRus))
                // ObligationType
                .ForMember(m => m.ObligationTypeID, o => o.MapFrom(f => f.ObligationType.ObligationTypeID))
                .ForMember(m => m.ObligationTypeNameEng, o => o.MapFrom(f => f.ObligationType.ObligationTypeNameEng))
                .ForMember(m => m.ObligationTypeNameRus, o => o.MapFrom(f => f.ObligationType.ObligationTypeNameRus))
                // Holder
                .ForMember(m => m.IntentionHolderID, o => o.MapFrom(f => f.IntentionHolder.UserID))
                .ForMember(m => m.IntentionHolderFirstName, o => o.MapFrom(f => f.IntentionHolder.UserFirstName))
                .ForMember(m => m.IntentionHolderLastName, o => o.MapFrom(f => f.IntentionHolder.UserLastName))
                .ForMember(m => m.IntentionHolderAvatarSmall, o => o.MapFrom(f => f.IntentionHolder.AvatarSmall))
                //Issuer
                .ForMember(m => m.IntentionIssuerID, o => o.MapFrom(f => f.IntentionIssuer.UserID))
                .ForMember(m => m.IntentionIssuerFirstName, o => o.MapFrom(f => f.IntentionIssuer.UserFirstName))
                .ForMember(m => m.IntentionIssuerLastName, o => o.MapFrom(f => f.IntentionIssuer.UserLastName))
                .ForMember(m => m.IntentionIssuerAvatarSmall, o => o.MapFrom(f => f.IntentionIssuer.Avatar.AvatarSmall))
                ;
        }
    }
}