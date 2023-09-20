from django.urls import include, path
from rest_framework.routers import DefaultRouter
from rest_framework_extensions.routers import NestedRouterMixin
from api import views
from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView

class NestedDefaultRouter(NestedRouterMixin, DefaultRouter):
    pass

router = NestedDefaultRouter()

nested = router.register('groups', views.GroupViewSet)
nested.register(
    r'events',
    views.EventViewSet,
    basename="group_events",
    parents_query_lookups=['group_id']
    )
nested.register(
    r'members',
    views.GroupMembershipViewSet,
    basename = "group_memberships",
    parents_query_lookups=['group_id']
)
nested.register(
    r'conflicts',
    views.ConflictViewSet,
    basename = "group_conflicts",
    parents_query_lookups=['group_id']
)

nested.register(
    r'topics',
    views.TopicViewSet,
    basename = "group_topics",
    parents_query_lookups=['group_id']
)
nested.register(
    r'invite-codes',
    views.InviteCodeViewSet,
    basename = 'group_invite_code',
    parents_query_lookups=['group_id']
)

urlpatterns = [
    path('', include(router.urls)),
    path('invite-codes/verify/', views.InviteCodeVerify.as_view(), name="invite_code_verify"),
    path('groups/<group>/find/<member>/', views.FindGroupMember.as_view(), name="find_group_member"),
    path('join-group/', views.JoinGroup.as_view(), name="join_group"),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('auth/register/', views.RegisterView.as_view(), name="register"),
    path('auth/login/', views.CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/verify/', TokenVerifyView.as_view(), name="token_verify"),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
