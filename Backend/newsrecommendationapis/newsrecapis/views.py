from django.http import JsonResponse
from newsrecapis.MLModels.NaiveBayse import train_nb_model
from newsrecapis.MLModels.LogisticRegression import train_lr_model
from newsrecapis.MLModels.SVM import train_svc_model
from newsrecapis.MLModels.NaiveBayse import train_nb_model
from newsrecapis.News.NewsClassProcessor import get_newsWithClass

def trainModel(request):
    try:
        # train_nb_model()  # Call the function to train the model
        # return JsonResponse({"message": "Model training successful"}, status=200)

        #train_lr_model()  # Call the function to train the model
        #return JsonResponse({"message": "Model training successful"}, status=200)

        train_svc_model()  # Call the function to train the model
        return JsonResponse({"message": "Model training successful"}, status=200)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

def getRecommendedNews(request):
    model_name = request.GET.get('model_name', None)
    # Implement logic to get recommended news based on the category
    recommended_news = get_newsWithClass(modelName = model_name)
    
    return JsonResponse({"recommended_news": recommended_news}, status=200)
