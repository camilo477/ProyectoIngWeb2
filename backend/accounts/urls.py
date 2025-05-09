from django.urls import path
from .views import RegisterUserView, CustomTokenObtainPairView, ExportUsersCSV
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path("register/", RegisterUserView.as_view(), name="register"),
    path("login/", CustomTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("export/csv/", ExportUsersCSV.as_view(), name="export_users_csv"),
]
