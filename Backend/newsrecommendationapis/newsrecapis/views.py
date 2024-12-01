from django.http import JsonResponse
from Backend.newsrecommendationapis.newsrecapis.MLModels.NaiveBayse import train_nb_model
from Backend.newsrecommendationapis.newsrecapis.MLModels.LogisticRegression import train_lr_model
from Backend.newsrecommendationapis.newsrecapis.MLModels.SVM import train_svc_model
def trainModel(request):
    try:
        train_nb_model()  # Call the function to train the model
        return JsonResponse({"message": "Model training successful"}, status=200)

        train_lr_model()  # Call the function to train the model
        return JsonResponse({"message": "Model training successful"}, status=200)

        train_svc_model()  # Call the function to train the model
        return JsonResponse({"message": "Model training successful"}, status=200)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

def getRecommendedNews(request):
    # Implement logic to get recommended news based on the category
    recommended_news = []
    return JsonResponse({"recommended_news": recommended_news}, status=200)
